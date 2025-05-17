import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { freelancerProgileApi } from "./freelancerProfileApi";
// import axios from "axios";

export const updateFreelancerProfile = createAsyncThunk(
  "freelancer/edit-profile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await freelancerProgileApi.updateProfile(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getFreelancerProfile = createAsyncThunk(
  "freelancer/get-profile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await freelancerProgileApi.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  freelancer: null,
  loading: false,
  error: null,
};

const freelancerProfileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFreelancerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFreelancerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.freelancer = action.payload.freelancer;
        state.error = null;
      })
      .addCase(updateFreelancerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Freelancer profile Update failde";
      })

      .addCase(getFreelancerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFreelancerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.freelancer = action.payload.freelancer;
        state.error = null;
      })
      .addCase(getFreelancerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ;
      })
  },
});

export const { clearError } = freelancerProfileSlice.actions;
export default freelancerProfileSlice.reducer;
