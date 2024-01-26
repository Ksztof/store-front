import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/authActions'; 

interface AuthState {
  loading: boolean;
  userData: any; 
  error: string | null;
}


const initialState: AuthState = {
  loading: false,
  userData: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Możesz dodać swoje reducery, jeśli są potrzebne
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Wrong credentials.'; // Uwaga: error może wymagać dostosowania w zależności od struktury błędu
      });
  },
});

export default authSlice.reducer;
