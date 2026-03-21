const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const passport = require('./config/passport'); // Load Passport Strategy

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Vite default port
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json()); // Parse incoming JSON payloads
app.use(cookieParser()); // Parse cookies attached to the client request

app.use(passport.initialize()); // Initialize Passport inside Express!

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'MaxxArena API is running smoothly 🚀' });
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong on the server!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
