import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientProgileApi } from "./clientProgileApi";
// import axios from "axios";

export const updateClientProfile = createAsyncThunk(
  "client/edit-profile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await clientProgileApi.updateProfile(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getClientProfile = createAsyncThunk(
  "client/get-profile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await clientProgileApi.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  client: null,
  loading: false,
  error: null,
};

const clientProfileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateClientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload.client;
        state.error = null;
      })
      .addCase(updateClientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Client profile Update failde";
      })

      .addCase(getClientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload.client;
        state.error = null;
      })
      .addCase(getClientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ;
      })
  },
});

export const { clearError } = clientProfileSlice.actions;
export default clientProfileSlice.reducer;
