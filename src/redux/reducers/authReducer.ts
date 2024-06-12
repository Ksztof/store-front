import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { login, register, resetAuth } from '../actions/authActions'; 
import { AuthState } from '../../types/authTypes';
import { ReducerStates } from '../../types/sharedTypes';

const initialState: AuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  status: ReducerStates.Idle
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (authState) => {
      authState.isLoggedIn = false;
      authState.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
        state.status = ReducerStates.Pending;
      })
      .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<void | undefined>) => {//add payload action
        state.loading = false;
        state.isLoggedIn = true;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(login.rejected, (state: AuthState) => {
        state.loading = false;
        state.error = 'Wrong credentials.';
        state.status = ReducerStates.Rejected
      })
      
      .addCase(register.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
        state.status = ReducerStates.Pending;
      })
      .addCase(register.fulfilled, (state: AuthState, action: PayloadAction<void | undefined>) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(register.rejected, (state: AuthState) => {
        state.loading = false;
        state.error = 'Wrong credentials.';
        state.status = ReducerStates.Rejected
      })

      .addCase(resetAuth, () => initialState);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
