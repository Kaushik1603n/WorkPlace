import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProjectApi } from "./projectApi";


export const createNewJob = createAsyncThunk(
  "client/new-project",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await createProjectApi.createJob(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  project: null,
  loading: false,
  error: null,
};

const clientProject = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewJob.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload.data;
        state.error = null;
      })
      .addCase(createNewJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ;
      })
  },
});

export const { clearError } = clientProject.actions;
export default clientProject.reducer;
