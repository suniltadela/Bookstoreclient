import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Reducer/Authslice/Authslice';
import forgotPasswordSlice from '../Reducer/Forgetpasswordslice/Forgetpasswordslice';
import resetPasswordSlice from '../Reducer/Resetpasswordslice/Resetpasswordslice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    forgotPassword: forgotPasswordSlice,
    resetPassword: resetPasswordSlice
  },
});
