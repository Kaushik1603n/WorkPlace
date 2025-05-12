import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const token = localStorage.getItem('access_token');

  // If we have a token but auth state is still loading
  if (token && loading) {
    // return <div>Loading...</div>;
  }

  // If no token and not loading, definitely not authenticated
  if (!token && !loading) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
