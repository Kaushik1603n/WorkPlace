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
} from "../controllers/authControllers.js";
import authenticate from "../middleware/authMiddleware.js";

// Public routes
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/refresh", refresh);

router.post("/forgot-pass", forgotPass);
router.post("/verify-reset-otp", resetPassVerifyOtp);
router.post("/reset-pass", changePassword);

// Protected routes
router.post("/logout", authenticate, logout);

export default router;
