import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import JoinAs from "./pages/auth/JoinAs";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/auth/authSlice";
import HomePage from "./pages/home/Home";
import OTPVerification from "./pages/auth/OTPVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetOtp from "./pages/auth/ResetOtp";
import ChangePass from "./pages/auth/ChangePass";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     console.log("Token exists:", !!token);
//     if (token) {
//       console.log("Dispatching fetchUser");
//       dispatch(fetchUser())
//         .unwrap()
//         .then(() => console.log("Fetch user succeeded"))
//         .catch((err) => console.log("Fetch user failed:", err));
//     }
//   }, [dispatch]);
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />

//         {/* Protected routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/" element={<SignupPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(fetchUser())
        .unwrap()
        .finally(() => setAuthChecked(true));
    } else {
      setAuthChecked(true);
    }
  }, [dispatch]);

  if (!authChecked) {
    // return <div>Loading application...</div>;
  }
  1234;
  return (
    <Router>
      <Routes>
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join-as" element={<JoinAs />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/otp" element={<ResetOtp />} />
            <Route path="/change-pass" element={<ChangePass />} />
          </>
        )}
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/verify-otp" element={<Navigate to="/" />} />
          <Route path="/forgot-pass" element={<Navigate to="/" />} />
          <Route path="/otp" element={<Navigate to="/" />} />
          <Route path="/change-pass" element={<Navigate to="/" />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
