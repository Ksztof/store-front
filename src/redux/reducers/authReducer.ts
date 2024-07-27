import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { login, register, removeGuestSessionId, resetAuth } from '../actions/authActions';
import { AuthState } from '../../types/authTypes';
import { ReducerStates } from '../../types/sharedTypes';
import { apiErrorInitialValue } from '../../initialValues/authInitials';
import { ApiError } from '../../types/errorTypes';

const initialState: AuthState = {
  loading: false,
  error: apiErrorInitialValue,
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
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(login.rejected, (state: AuthState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload)
          state.error = action.payload;
        state.status = ReducerStates.Rejected
      })

      .addCase(register.pending, (state: AuthState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(register.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(register.rejected, (state: AuthState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload)
          state.error = action.payload;
        state.status = ReducerStates.Rejected
      })

      .addCase(removeGuestSessionId.pending, (state: AuthState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(removeGuestSessionId.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(removeGuestSessionId.rejected, (state: AuthState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload)
          state.error = action.payload;
        state.status = ReducerStates.Rejected
      })

      .addCase(resetAuth, () => initialState)
  },
});

export default authSlice.reducer;
