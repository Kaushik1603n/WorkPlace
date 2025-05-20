import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedFreelancerRoute() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "freelancer") {
    return <Navigate to="/" replace />;
  }

  return user?.role === "freelancer" ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedFreelancerRoute
