// src/Redux/Reducer/Authslice/forgotPasswordSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendOtp = createAsyncThunk(
  'forgotPassword/sendOtp',
  async ({ identifier }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
        identifier: identifier 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    otpSent: false,
    error: null,
    snackbar: { open: false, message: '', severity: 'success' }
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.snackbar = { open: true, message: 'OTP sent successfully', severity: 'success' };
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to send OTP. Please try again.';
        state.snackbar = { open: true, message: state.error, severity: 'error' };
      });
  }
});

export const { clearError, closeSnackbar } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
