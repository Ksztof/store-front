import axios from 'axios';
import { AboutCart } from '../types/cartTypes';
import { ApiResponse } from '../types/apiResponseTypes';

axios.defaults.withCredentials = true;

export const getCartContent = async (): Promise<ApiResponse<AboutCart>>=> {
  const response = await axios.get<ApiResponse<AboutCart>>('https://localhost:5445/api/Carts', {});
  return response.data;
};
