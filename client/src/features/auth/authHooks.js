import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, verifyEmail, logoutUser, fetchUser } from './authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: (credentials) => dispatch(loginUser(credentials)),
    register: (userData) => dispatch(registerUser(userData)),
    verifyEmail: (token) => dispatch(verifyEmail(token)),
    logout: () => dispatch(logoutUser()),
    fetchUser: () => dispatch(fetchUser()),
  };
};