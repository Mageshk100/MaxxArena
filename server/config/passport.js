const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Hardcoding for localhost explicitly, but can use relative strings in prod
      callbackURL: 'http://localhost:5000/api/auth/google/callback', 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const avatar = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;

        // 1. Check if user already exists
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          // 2. If user registered manually before, but clicks "Login with Google", merge their account implicitly
          if (user.provider !== 'google') {
            user = await prisma.user.update({
              where: { email },
              data: { provider: 'google', avatar },
            });
          }
          return done(null, user); // Send user down the pipeline to req.user
        } else {
          // 3. User is completely new, create them natively
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              avatar,
              provider: 'google',
              // No password required for OAuth users!
            },
          });
          return done(null, newUser); // Send standard user format down the pipeline
        }
      } catch (error) {
        console.error('Passport Google Strategy Error:', error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
