import axios, { HttpStatusCode } from 'axios';
import { LoginCredentials, RegisterCredentials } from '../types/authTypes';
import { NoContentApiResponse } from '../types/noContentApiResponse';
import { isProblemDetails } from '../utils/responseUtils';
import { ApiError } from '../types/errorTypes';

axios.defaults.withCredentials = true;

export const loginUser = async (credentials: LoginCredentials): Promise<NoContentApiResponse | ApiError> => {
  try {
    const response: void | any =
      await axios.post<void>('https://localhost:5004/api/User/login', credentials);

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API when logging in");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error(`Failed to login because of unexpected error with message: ${error.message}`);
  };
};

export const registerUser = async (credentials: RegisterCredentials): Promise<NoContentApiResponse | ApiError> => {
  try {
    const response: void | any =
      await axios.post('https://localhost:5004/api/User', credentials);

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API during registration");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error(`Failed to register because of unexpected error with message: ${error.message}`);
  };
};

export const removeGuestSessionIdApi = async (): Promise<NoContentApiResponse | ApiError> => {
  try {
    const response: void | any =
      await axios.get('https://localhost:5004/api/User', {});

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API during removing guest session Id");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error(`Failed to remove guest session Id because of unexpected error with message: ${error.message}`);
  };
};

