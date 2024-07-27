import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, removeGuestSessionIdApi } from '../../api/authService';
import { LoginCredentials, RegisterCredentials } from '../../types/authTypes';
import { NoContentApiResponse } from '../../types/noContentApiResponse';
import { isApiError, isNoContentResponse } from '../../utils/responseUtils';
import { ApiError } from '../../types/errorTypes';

export const login = createAsyncThunk<
  void,
  LoginCredentials,
  { rejectValue: ApiError | string }
>(
  'auth/login',
  async (payload: LoginCredentials, { rejectWithValue }) => {
    try {
      const response: NoContentApiResponse | ApiError = await loginUser(payload);
      if (isApiError(response)) {
        return rejectWithValue(response);
      }

      if (isNoContentResponse(response)) {
        return;
      }
    } catch (error: any) {
      console.error("Login error:", error);
      return rejectWithValue("Unexpected error occured when logging in.");
    }
  }
);

export const register = createAsyncThunk<
  void,
  RegisterCredentials,
  { rejectValue: ApiError | string }
>(
  'auth/register',
  async (payload: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response: NoContentApiResponse | ApiError = await registerUser(payload);
      
      if (isApiError(response)) {
        return rejectWithValue(response);
      }
      
      if (isNoContentResponse(response)) {
        console.log("register: isNoContentResponse")
        return;
      }
    } catch (error: any) {
      console.error("register error:", error);
      return rejectWithValue("Unexpected error occured when registering.");
    }
  }
);

export const removeGuestSessionId = createAsyncThunk<
  void,
  void,
  { rejectValue: ApiError | string }
>(
  'auth/removeGuestSessionId',
  async (_, { rejectWithValue }) => {
    try {
      const response: NoContentApiResponse | ApiError = await removeGuestSessionIdApi();
      if (isApiError(response)) {
        return rejectWithValue(response);
      }

      if (isNoContentResponse(response)) {
        return;
      }
    } catch (error: any) {
      console.error("removeGuestSessionId error:", error);
      return rejectWithValue("Unexpected error occured when removing guest session Id.");
    }
  }
);

export const resetAuth = createAction('auth/reset');

