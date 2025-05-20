import express from "express";
import passport from "passport";
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
  googleCallback,
  getUser,
  userRole,
} from "../controllers/authControllers.js";
import authenticate from "../middleware/authMiddleware.js";
import { generateTokens } from "../utils/jwt.js";

// Public routes
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/refresh", refresh);

router.post("/forgot-password", forgotPass);
router.post("/verify-reset-otp", resetPassVerifyOtp);
router.get("/resend-otp", resendOtp);
router.post("/reset-password", changePassword);

// Protected routes
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback
);

router.get("/user", passport.authenticate("jwt", { session: false }), getUser);
router.post("/set-role",authenticate, userRole);

export default router;
