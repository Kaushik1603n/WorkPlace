import axiosClient from '../../utils/axiosClient';

export const authApi = {
  register: (userData) => axiosClient.post('/auth/register', userData),
  login: (credentials) => axiosClient.post('/auth/login', credentials),
  verifyEmail: (token) => axiosClient.post('/auth/verify-otp', token),
  forgotPassword: (email) => axiosClient.post('/auth/forgot-password', email ),
  resetOtp: (otp) => axiosClient.post('/auth/verify-reset-otp',  otp ),
  resetPassword: (data) => axiosClient.post('/auth/reset-password', data),
  logout: () => axiosClient.post('/auth/logout'),
  getMe: () => axiosClient.get('/auth/me'),
};