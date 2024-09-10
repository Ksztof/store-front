import axios, { HttpStatusCode } from 'axios';
import { LoginCredentials, RegisterCredentials } from './authTypes';
import { NoContentApiResponse, ApiError } from '../shared/sharedTypes';
import { isProblemDetails } from '../shared/validation/typeGuards/typeGuardsUtils';

axios.defaults.withCredentials = true;

export const loginApi = async (credentials: LoginCredentials): Promise<NoContentApiResponse | ApiError> => {
  try {
    const response: void | any =
      await axios.post<void>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/User/login', credentials);

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

export const registerApi = async (credentials: RegisterCredentials): Promise<NoContentApiResponse | ApiError> => {
  try {
    const response: void | any =
      await axios.post('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/User', credentials);

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
      await axios.get('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/User', {});

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

export const logoutApi = async (): Promise<NoContentApiResponse | ApiError> => {
  try {
    const response: void | any =
      await axios.get('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/User/logout', {});

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API during logging out");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error(`Failed log out because of unexpected error with message: ${error.message}`);
  };
};



