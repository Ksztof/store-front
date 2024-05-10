import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/authActions'; 
import { AuthState } from '../../types/authTypes';

const initialState: AuthState = {
  loading: false,
  userData: null,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (authState) => {
      authState.userData = null;
      authState.isLoggedIn = false;
      authState.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (authState) => {
        authState.loading = true;
        authState.error = null;
      })
      .addCase(login.fulfilled, (authState, action) => {
        authState.loading = false;
        authState.userData = action.payload;
        authState.isLoggedIn = true;
      })
      .addCase(login.rejected, (authState) => {// change any for AuthState
        authState.loading = false;
        authState.error = 'Wrong credentials.';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
