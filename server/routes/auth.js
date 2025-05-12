import express from "express";
import passport from 'passport';
const router = express.Router();
import {
  register,
  login,
  refresh,
  logout,
  verifyOtp,
  resendOtp,
  forgotPass,
  resetPassVerifyOtp,
  changePassword,
  getMe,
} from "../controllers/authControllers.js";
import authenticate from "../middleware/authMiddleware.js";
import { generateTokens } from "../utils/jwt.js";
import User from "../models/User.js";

// Public routes
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/refresh", refresh);

router.post("/forgot-password", forgotPass);
router.post("/verify-reset-otp", resetPassVerifyOtp);
router.post("/reset-password", changePassword);

// Protected routes
router.post("/logout", authenticate, logout);
router.get('/me', authenticate, getMe);


router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user;

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Store refreshToken in DB (optional but recommended)
      await User.findByIdAndUpdate(user._id, { refreshToken });

      // Redirect to frontend with tokens in query params (or use cookies)
      res.redirect(`${process.env.CLIENT_URL}/oauth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }
  }
);


export default router;
