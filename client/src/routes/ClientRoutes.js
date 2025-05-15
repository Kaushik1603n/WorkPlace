import React from "react";
import { Route } from "react-router-dom";
import ClientLayout from "../pages/Client-Dashboard/ClientLayout";
import ClientDashboard from "../pages/Client-Dashboard/Dashboard";
import ClientProfile from "../pages/Client-Dashboard/profile/ClientProfile";
import ClientProfileEdit from "../pages/Client-Dashboard/profile/ClientProfileEdit";

const ClientRoutes = () => (
  <Route path="/client-dashboard" element={<ClientLayout />}>
    <Route index element={<ClientDashboard />} />
    <Route path="payments" element={<div>Payment Page</div>} />
    <Route path="profile" element={<ClientProfile />} />
    <Route path="profile/edit" element={<ClientProfileEdit />} />
    <Route path="message" element={<div>Message Page</div>} />
    <Route path="notification" element={<div>Notification Page</div>} />
    <Route path="posting" element={<div>Project Posting Page</div>} />
    <Route path="freelancer" element={<div>Freelancer Page</div>} />
    <Route path="interview" element={<div>Interview Scheduling Page</div>} />
    <Route path="dispute" element={<div>Dispute Resolution Page</div>} />
  </Route>
);

export default ClientRoutes;
