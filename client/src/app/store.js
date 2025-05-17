import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientReducer from '../features/clientProgile/clientProgileSlice';
import freelancerReducer from '../features/freelancerProfile/freelancerProfileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client:clientReducer,
    freelancer:freelancerReducer
  },
});

export default store;