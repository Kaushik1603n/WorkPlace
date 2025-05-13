import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import jwtStrategy from "./strategy/jwt.js"
jwtStrategy(passport);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
  
  passReqToCallback:true
},  async (req, accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 
      $or: [
        { googleId: profile.id },
        { email: profile.emails[0]?.value }
      ]
    });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        fullName: profile.displayName,
        email: profile.emails[0].value,
        isVerified: true,
      });
      console.log(user);
      
    } else if (!user.googleId) {
      user.googleId = profile.id;
      await user.save();
    }

    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));