import axios from 'axios';
import { AboutCart, NewProductsForApi } from '../types/cartTypes';
import { ApiError, ApiResponse, ErrorContent } from '../types/apiResponseTypes';
import { isAboutCart, isErrorContent } from '../utils/responseUtils';
import humps from 'humps';

axios.defaults.withCredentials = true;

export const getCartContent = async (): Promise<ApiResponse<AboutCart>> => {
  try {
    const response = await axios.get<AboutCart>('https://localhost:5445/api/Carts', {});
    const data = response.data;

    if (isAboutCart(data)) {
      return {
        isSuccess: true,
        entity: data
      };
    } else if (isErrorContent(data)) {
      return {
        isSuccess: false,
        error: data
      };
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    throw new Error("Failed to download cart content because of unexpected error");
  }
};

export const saveCartContent = async (cartContent: NewProductsForApi): Promise<ApiResponse<AboutCart>> => {
  try {
    const response = await axios.put<AboutCart>('https://localhost:5445/api/Carts', cartContent);
    const data = response.data;
    console.log("data" +JSON.stringify(data));
    if (isAboutCart(data)) {
      return {
        isSuccess: true,
        entity: data
      };
    } else if (isErrorContent(data)) {
      return {
        isSuccess: false,
        error: data
      };
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    throw new Error("Failed to save cart content because of unexpected error");
  }
};