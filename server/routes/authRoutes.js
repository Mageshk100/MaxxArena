const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser, googleOAuthCallback } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const passport = require('passport');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   POST /api/auth/logout
router.post('/logout', logoutUser);

// @route   GET /api/auth/me
router.get('/me', protect, getUserProfile);

// =======================
// GOOGLE OAUTH ROUTES
// =======================

// @route   GET /api/auth/google
// @desc    Trigger Google OAuth Splash Screen
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// @route   GET /api/auth/google/callback
// @desc    Handle the OAuth redirect from Google servers
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }),
  googleOAuthCallback
);

module.exports = router;
