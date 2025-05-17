import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { marketPlaceApi } from "./marketPlaceApi";

export const getAllTheJobs = createAsyncThunk(
  "/jobs/get-jobs",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const response = await marketPlaceApi.getJobs(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const marketPlaceSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllTheJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTheJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.error = null;
      })
      .addCase(getAllTheJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const { clearError } = marketPlaceSlice.actions;
export default marketPlaceSlice.reducer;
