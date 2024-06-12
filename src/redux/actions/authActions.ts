import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/authService';
import { LoginCredentials, RegisterCredentials } from '../../types/authTypes';

export const login = createAsyncThunk<
  void,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (payload: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(payload);
      return response;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk<
  void,
  RegisterCredentials,
  { rejectValue: string }
>(
  'auth/register',
  async (payload: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await registerUser(payload);
      return response;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetAuth = createAction('auth/reset');
