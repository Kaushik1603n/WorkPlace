import React from "react";
import { Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home/Home";
import ProtectedRoute from "../utils/ProtectedRoute";

const ProtectedRoutes = () => (
  <Route element={<ProtectedRoute />}>
    <Route path="/login" element={<Navigate to="/" />} />
    <Route path="/register" element={<Navigate to="/" />} />
    <Route path="/verify-otp" element={<Navigate to="/" />} />
    <Route path="/forgot-pass" element={<Navigate to="/" />} />
    <Route path="/otp" element={<Navigate to="/" />} />
    <Route path="/change-pass" element={<Navigate to="/" />} />
    <Route path="/home" element={<HomePage />} />
  </Route>
);

export default ProtectedRoutes;
