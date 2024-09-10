import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, NoContentApiResponse } from '../shared/sharedTypes';
import { isApiError, isNoContentResponse } from '../shared/validation/typeGuards/typeGuardsUtils';
import { loginApi, registerApi, removeGuestSessionIdApi, logoutApi } from './authService';
import { LoginCredentials, RegisterCredentials } from './authTypes';

export const login = createAsyncThunk<
  void,
  LoginCredentials,
  { rejectValue: ApiError | string }
>(
  'auth/login',
  async (payload: LoginCredentials, { rejectWithValue }) => {
    try {
      const response: NoContentApiResponse | ApiError = await loginApi(payload);

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
      const response: NoContentApiResponse | ApiError = await registerApi(payload);

      if (isApiError(response)) {
        return rejectWithValue(response);
      }

      if (isNoContentResponse(response)) {
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
      return rejectWithValue(`Unexpected error occured when removing guest session Id with message: ${error.message}`);
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: ApiError | string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response: NoContentApiResponse | ApiError = await logoutApi();

      if (isApiError(response)) {
        return rejectWithValue(response);
      }

      if (isNoContentResponse(response)) {
        return;
      }
      
    } catch (error: any) {
      console.error("logout error:", error);
      return rejectWithValue(`Unexpected error occured when logging out with message: ${error.message}`);
    }
  }
);

export const resetAuth = createAction('auth/reset');



