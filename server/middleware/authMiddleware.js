const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to protect private routes
const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the access token
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // 4. Retrieve the user from DB based on decoded ID
      // We use `select` to omit the password from the req.user object entirely!
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true, provider: true, avatar: true },
      });

      // Edge case: User was deleted but token still exists
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized, user account no longer exists.' });
      }

      // 5. Grant access to the route
      next(); 
    } catch (error) {
      console.error('Authentication Error:', error.message);
      return res.status(401).json({ error: 'Not authorized, token validation failed.' });
    }
  }

  // 6. If no bearer token is found at all
  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided.' });
  }
};

module.exports = { protect };
