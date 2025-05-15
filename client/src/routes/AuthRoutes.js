import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import JoinAs from "../pages/auth/JoinAs";
import OTPVerification from "../pages/auth/OTPVerification";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetOtp from "../pages/auth/ResetOtp";
import ChangePass from "../pages/auth/ChangePass";

const AuthRoutes = () => (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/join-as" element={<JoinAs />} />
    <Route path="/register" element={<SignupPage />} />
    <Route path="/verify-otp" element={<OTPVerification />} />
    <Route path="/forgot-pass" element={<ForgotPassword />} />
    <Route path="/otp" element={<ResetOtp />} />
    <Route path="/change-pass" element={<ChangePass />} />
  </>
);

export default AuthRoutes;
