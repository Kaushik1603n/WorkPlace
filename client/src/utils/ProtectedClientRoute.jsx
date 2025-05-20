import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedClientRoute() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "client") {
    return <Navigate to="/" replace />;
  }

  return user?.role === "client" ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedClientRoute;
