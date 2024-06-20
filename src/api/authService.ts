import axios from 'axios';
import { LoginCredentials, RegisterCredentials } from '../types/authTypes';
import { ApiResponseNoContent } from '../types/apiResponseWithEmpty';
import { isProblemDetails } from '../utils/responseUtils';
import { ApiError } from '../types/errorTypes';
axios.defaults.withCredentials = true;

export const loginUser = async (credentials: LoginCredentials): Promise<ApiResponseNoContent | ApiError> => {
  try {
    await axios.post('https://localhost:5004/api/User/login', credentials);
    const responseDetails: ApiResponseNoContent = { isSuccess: true, isEmpty: true };
    return responseDetails;
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error("Failed to login because of unexpected error");
  };
};

export const registerUser = async (credentials: RegisterCredentials): Promise<ApiResponseNoContent | ApiError> => {
  try {
    await axios.post('https://localhost:5004/api/User', credentials);
    const responseDetails: ApiResponseNoContent = { isSuccess: true, isEmpty: true };
    return responseDetails;
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error("Failed to register because of unexpected error");
  };
};