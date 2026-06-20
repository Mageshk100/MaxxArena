const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Helper to generate access and refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId }, 
    process.env.JWT_ACCESS_SECRET, 
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: userId }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
  
  return { accessToken, refreshToken };
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate incoming data
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password' });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // 3. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        provider: 'local', // Explicitly stating local instead of google
      },
    });

    // 5. Send success response (excluding the password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate incoming data
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // 2. Find user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 3. Prevent users who signed up with Google from trying to log in with a blank password
    if (!user.password) {
      return res.status(401).json({ error: 'This account uses Google OAuth. Please log in with Google.' });
    }

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 5. Generate secure JSON Web Tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // 6. Set HTTP-only Cookie for Refresh Token
    // Because it's HTTP-only, Javascript cannot read it (mitigates XSS attacks)
    res.cookie('jwt', refreshToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // Must be false for localhost dev
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Must be 'none' for cross-domain cookies in prod
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days literal milliseconds
    });

    // 7. Send response
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
      },
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// @desc    Get user profile details via JWT
// @route   GET /api/auth/me
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    // The `protect` middleware already verified the token 
    // and fetched the user data safely excluding the password.
    // All we have to do is return `req.user`!
    
    res.status(200).json({
      message: 'User profile retrieved successfully',
      user: req.user,
    });
  } catch (error) {
    console.error('Profile Retrieval Error:', error);
    res.status(500).json({ error: 'Server error retrieving profile' });
  }
};

// @desc    Logout user & clear refresh token cookie
// @route   POST /api/auth/logout
// @access  Public
exports.logoutUser = (req, res) => {
  // Clear the secure HTTP-only cookie by setting its expiration to the past
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    expires: new Date(0), 
  });
  
  res.status(200).json({ message: 'User logged out successfully' });
};

// @desc    Google OAuth Callback Handler
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleOAuthCallback = (req, res) => {
  // If we reach this point, req.user specifically exists because Passport authenticated them natively
  const { accessToken, refreshToken } = generateTokens(req.user.id);

  // Set the remote HTTP-only cookie using the exact logic as standard login
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  // Redirect the user back to the frontend homepage
  // We append the access token so the frontend can instantly harvest it from the URL
  res.redirect(`${process.env.CLIENT_URL}?token=${accessToken}`);
};
