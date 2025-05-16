import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientReducer from '../features/clientProgile/clientProgileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client:clientReducer
  },
});

export default store;