import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './authTypes';
import { ReducerStates } from '../shared/sharedTypes';
import { login, register, removeGuestSessionId, logout, resetAuth } from './authActions';

const initialState: AuthState = {
  loading: false,
  isLoggedIn: false,
  status: ReducerStates.Idle
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(login.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.status = ReducerStates.LoggedIn;
      })
      .addCase(login.rejected, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.Rejected
      })

      .addCase(register.pending, (state: AuthState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(register.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.Registered;
      })
      .addCase(register.rejected, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.Rejected
      })

      .addCase(removeGuestSessionId.pending, (state: AuthState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(removeGuestSessionId.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.GuestSessionIdRemoved;
      })
      .addCase(removeGuestSessionId.rejected, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.Rejected
      })

      .addCase(logout.pending, (state: AuthState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.status = ReducerStates.LoggedOut;
      })
      .addCase(logout.rejected, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.Rejected
      })

      .addCase(resetAuth, () => initialState)
  },
});

export default authSlice.reducer;
