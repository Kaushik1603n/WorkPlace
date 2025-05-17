import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clientReducer from "../features/clientProgile/clientProgileSlice";
import freelancerReducer from "../features/freelancerProfile/freelancerProfileSlice";
import clientProjectReducer from "../features/project/projectSlice";
import marketPlaceReducer from "../features/marketPlace/marketPlaceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    freelancer: freelancerReducer,
    clientProject: clientProjectReducer,
    market: marketPlaceReducer,
  },
});

export default store;
