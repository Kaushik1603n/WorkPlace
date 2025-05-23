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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSuccess from "./components/auth/LoginSuccess";
import ClientDashboard from "./pages/Client-Dashboard/Dashboard";
import ClientLayout from "./pages/Client-Dashboard/ClientLayout";
import ClientProfile from "./pages/Client-Dashboard/profile/ClientProfile";
import ClientProfileEdit from "./pages/Client-Dashboard/profile/ClientProfileEdit";
import FreelancerDashboard from "./pages/Freelancer-Dashboard/Dashboard";
import FreelancerLayout from "./pages/Freelancer-Dashboard/FreelancerLayout";
import FreelancerProfile from "./pages/Freelancer-Dashboard/profile/FreelancerProfile";
import FreelancerProfileEdit from "./pages/Freelancer-Dashboard/profile/FreelancerProfileEdit";
import JobPostingForm from "./pages/Client-Dashboard/JobProsting/JobPostingForm";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import JobDetails from "./pages/MarketPlace/JobDetails";
import ApplyJob from "./pages/MarketPlace/ApplyJob";
import ClientJobDetails from "./pages/Client-Dashboard/JobProsting/ClientJobDetails";
import AllProposals from "./pages/Client-Dashboard/proposals/AllProposals";
import ProposalDetails from "./pages/Client-Dashboard/proposals/ProposalDetails";
import FreelancerBit from "./pages/Freelancer-Dashboard/Proposal-Bid/FreelancerBit";
import ProtectedClientRoute from "./utils/ProtectedClientRoute";
import ProtectedFreelancerRoute from "./utils/ProtectedFreelancerRoute";

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

  return (
    <Router>
      <ToastContainer />
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

        <Route element={<ProtectedClientRoute />}>
          <Route path="/client-dashboard" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="job-details/:jobId" element={<ClientJobDetails />} />
            <Route
              path="job-details/:jobId/all-proposal"
              element={<AllProposals />}
            />
            <Route
              path="job-details/:jobId/all-proposal/propisal-details/:proposalId"
              element={<ProposalDetails />}
            />
            <Route path="payments" element={<div>Payment Page</div>} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="profile/edit" element={<ClientProfileEdit />} />
            <Route path="message" element={<div>Message Page</div>} />
            <Route path="notification" element={<div>Notification Page</div>} />
            <Route path="posting" element={<JobPostingForm />} />
            <Route path="freelancer" element={<div>Freelancer Page</div>} />
            <Route
              path="interview"
              element={<div>Interview Scheduling Page</div>}
            />
            <Route
              path="dispute"
              element={<div>Dispute Resolution Page</div>}
            />
          </Route>
        </Route>

        <Route element={ProtectedFreelancerRoute}>
          <Route path="/freelancer-dashboard" element={<FreelancerLayout />}>
            <Route index element={<FreelancerDashboard />} />
            <Route path="payments" element={<div>Payment Page</div>} />
            <Route path="profile" element={<FreelancerProfile />} />
            <Route path="profile/edit" element={<FreelancerProfileEdit />} />
            <Route path="message" element={<div>Message Page</div>} />
            <Route path="notification" element={<div>Notification Page</div>} />
            <Route path="calender" element={<div>Calender page</div>} />
            <Route path="client" element={<div>Client Page</div>} />
            <Route
              path="interview"
              element={<div>Interview Scheduling Page</div>}
            />
            <Route path="proposals" element={<FreelancerBit />} />
            <Route
              path="dispute"
              element={<div>Dispute Resolution Page</div>}
            />
          </Route>
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/success-login" element={<LoginSuccess />} />
        <Route path="/market-place" element={<MarketPlace />}></Route>
        <Route
          path="/market-place/job-details/:jobId"
          element={<JobDetails />}
        />
        <Route
          path="/market-place/job-details/:jobId/apply-job"
          element={<ApplyJob />}
        />
         <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
