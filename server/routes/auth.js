import express from "express";
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

export default router;
