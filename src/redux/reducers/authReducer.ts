import { createSlice } from '@reduxjs/toolkit';
import { login, resetAuth } from '../actions/authActions'; 
import { AuthState } from '../../types/authTypes';
import { ReducerStates } from '../../types/sharedTypes';

const initialState: AuthState = {
  loading: false,
  userData: null,
  error: null,
  isLoggedIn: false,
  status: ReducerStates.Idle
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
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = ReducerStates.Pending;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.isLoggedIn = true;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = 'Wrong credentials.';
        state.status = ReducerStates.Rejected
      })
      
      .addCase(resetAuth, () => initialState);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
