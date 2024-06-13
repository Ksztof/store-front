import axios from 'axios';
import { LoginCredentials, RegisterCredentials } from '../types/authTypes';
import { ApiResponseWithEmpty } from '../types/apiResponseWithEmpty';
import { isErrorContent } from '../utils/responseUtils';

axios.defaults.withCredentials = true;

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axios.post('https://localhost:5004/api/User/login', credentials);
  return response.data;
};

export const registerUser = async (credentials: RegisterCredentials): Promise<ApiResponseWithEmpty<void>> => {
  try {
    const response = await axios.post('https://localhost:5004/api/User', credentials);
    if (response.status === 201) {
      return {
        isSuccess: true,
        isEmpty: true
      };
    }

    const data = response.data;
    console.log(isErrorContent(data));
    if (isErrorContent(data)) {
      return {
        isSuccess: false,
        error: data
      };
    } else {
      throw new Error("Invalid API response format");
    }
  } catch {
    throw new Error("Failed to register because of unexpected error");
  }
};
