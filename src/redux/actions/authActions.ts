import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../api/authService';
import { AuthState, LoginCredentials } from '../../types/authTypes';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {

    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);