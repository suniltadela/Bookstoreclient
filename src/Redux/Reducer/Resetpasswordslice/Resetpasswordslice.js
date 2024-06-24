import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const resetPassword = createAsyncThunk(
    'resetPassword/reset',
    async ({ identifier, otp, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/update-password', {
                identifier,
                otp,
                newPassword
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        loading: false,
        snackbar: {
            open: false,
            message: '',
            severity: ''
        },
    },
    reducers: {
        closeSnackbar: (state) => {
            state.snackbar.open = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.snackbar = {
                    open: true,
                    message: 'Password updated successfully. Redirecting to login...',
                    severity: 'success'
                };
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.snackbar = {
                    open: true,
                    message: action.payload ? action.payload.message : 'Failed to update password',
                    severity: 'error'
                };
            });
    },
});

export const { closeSnackbar } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
