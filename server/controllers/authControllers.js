import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.js";
import {
  sendOtpEmail,
  sendPasswordResetOtpEmail,
} from "../utils/nodemailer.js";
import crypto from "crypto";

const storeRefreshToken = async (userId, token) => {
  await User.findByIdAndUpdate(userId, { refreshToken: token });
};

const clearRefreshToken = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// Register a new user
export const register = async (req, res) => {
  const { joinAs, fullName, email, password } = req.body;

  if (!joinAs || !fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const user = await User.create({
      role: joinAs,
      fullName,
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpiry,
    });

    await sendOtpEmail(email, fullName, otp);

    return res.status(201).json({
      success: true,
      message:
        "OTP sent to your email. Please verify to complete registration.",
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "User ID and OTP are required",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (Number(user.otp) !== Number(otp)) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(401).json({
        success: false,
        message: "OTP has expired",
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id, user.email);

    await storeRefreshToken(user._id, refreshToken);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      accessToken, // Optional: include in response if needed by client
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resendOtp = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOtpEmail(user.email, user.fullName, otp);

    return res.status(200).json({
      success: true,
      message: "New OTP sent to your email",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Forgot password
export const forgotPass = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" }); // Fixed message from "User Already Exists"
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    existingUser.otp = otp;
    existingUser.otpExpiry = otpExpiry;

    await existingUser.save();

    await sendPasswordResetOtpEmail(email, existingUser.fullName, otp);

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to change password.",
      userId: existingUser._id,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Server error during password reset process",
    });
  }
};

export const resetPassVerifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "User ID and OTP are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (Number(user.otp) !== Number(otp) || new Date() > user.otpExpiry) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  const { userId, newPassword, confirmPassword } = req.body;

  try {
    if (!userId || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.email);
    await storeRefreshToken(user._id, refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: "strict",
    });
    console.log(refreshToken, "refresh token");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const refresh = async (req, res) => {
  try {
    console.log("Incoming cookies:", req.cookies); // Add this line
    console.log("Refresh token from cookies:", req.cookies?.refreshToken);

    const checkRefreshToken = req.cookies?.refreshToken;
    if (!checkRefreshToken) {
      console.log("No refresh token found in cookies");

      return res
        .status(401)
        .json({ success: false, message: "Refresh token required" });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(checkRefreshToken);

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== checkRefreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }

        const { accessToken, refreshToken} = generateTokens(user._id, user.email);

    await storeRefreshToken(user._id, refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.json({ success: true, accessToken });
  } catch (error) {
    console.error("Refresh error:", error);
    return res
      .status(403)
      .json({ success: false, message: "Invalid refresh token" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .select("-refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { userId } = req.user;
    await clearRefreshToken(userId);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    const { accessToken, refreshToken } = generateTokens(user._id, user.email);

    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.redirect(
      `${process.env.CLIENT_URL}/success-login?accessToken=${accessToken}`
    );
  } catch (error) {
    console.error("error during google callback", error);
    res
      .status(500)
      .json({ message: "internal server error during google login" });
  }
};

export const getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authenticated" });
    }
    res.json({ user: req.user });
  } catch (error) {
    console.error("error during get user", error);
    res.status(500).json({ message: "internal server error during  get user" });
  }
};
export const userRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "user not authenticated" });
    }

    const userId = req.user.userId;
    const userData = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true }
    );
    res.status(200).json({ message: "User role updated", user: userData });
  } catch (error) {
    console.error("error during get user", error);
    res.status(500).json({ message: "internal server error during  get user" });
  }
};
