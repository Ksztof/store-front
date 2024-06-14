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
    console.log(`eeeeeeeeeeeeeeeeeeeeee`);
    if (response.status === 201) {
      return {
        isSuccess: true,
        isEmpty: true
      };
    }

    const data = response.data;
    if (isErrorContent(data)) {
      return {
        isSuccess: false,
        error: data
      };
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    throw new Error("Failed to register because of unexpected error auth service");
  }
};
