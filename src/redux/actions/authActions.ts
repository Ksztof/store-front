import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/authService';
import { LoginCredentials, RegisterCredentials } from '../../types/authTypes';
import { ApiResponseWithEmpty, ErrorContent } from '../../types/apiResponseWithEmpty';
import { isApiError, isApiSuccessEmpty } from '../../utils/responseUtils';

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
  null,
  RegisterCredentials,
  { rejectValue: string | undefined }
>(
  'auth/register',
  async (payload: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response: ApiResponseWithEmpty<void> = await registerUser(payload);
      if (isApiError(response)) {
        const error: ErrorContent = response.error;
        return rejectWithValue(`Error code: ${error.code}, Error description: ${error.description}`);
      } else if (isApiSuccessEmpty(response)) {
        return null;
      } else {
        return rejectWithValue(`validation error`);
      }
    } catch (error: unknown) {
      console.error("Unexpected error auth actions:", error);
      return rejectWithValue("User cannot be registered, an unexpected error occurred");
    }
  }
);

export const resetAuth = createAction('auth/reset');
