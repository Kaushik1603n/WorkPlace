import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    // return <LoadingSpinner />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AuthRoute;
