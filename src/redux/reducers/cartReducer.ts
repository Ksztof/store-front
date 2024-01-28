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
    // Możesz dodać swoje reducery, jeśli są potrzebne
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
      .addCase(login.rejected, (authState, action) => {
        authState.loading = false;
        authState.error = 'Wrong credentials.'; // Uwaga: error może wymagać dostosowania w zależności od struktury błędu
      });
  },
});

export default authSlice.reducer;
