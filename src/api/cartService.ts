import axios from 'axios';
import { AboutCart, NewProductsForApi, checkCurrentCartPayload } from '../types/cartTypes';
import { ApiError, ApiResponse, ErrorContent } from '../types/apiResponseTypes';
import { isAboutCart, isErrorContent } from '../utils/responseUtils';

axios.defaults.withCredentials = true;

export const getCartContent = async (): Promise<ApiResponse<AboutCart>> => {
  try {
    const response = await axios.get<AboutCart>('https://localhost:5445/api/Carts', {});

    if (response.status === 204) {
      console.log('response.status === 204');
      return {
        isSuccess: true,
        isEmpty: true
      };
    }

    const data = response.data;
    if (isErrorContent(data)) {
      console.log('isErrorContent');

      return {
        isSuccess: false,
        error: data
      };

    } else if (isAboutCart(data)) {
      console.log('isAboutCart');

      return {
        isSuccess: true,
        entity: data
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
    console.log("data" + JSON.stringify(data));
    if (isErrorContent(data)) {
      return {
        isSuccess: false,
        error: data
      };

    } else if (isAboutCart(data)) {
      return {
        isSuccess: true,
        entity: data
      };

    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    throw new Error("Failed to save cart content because of unexpected error");
  }
};

export const checkCurrentCart = async (payload: checkCurrentCartPayload): Promise<ApiResponse<AboutCart>> => {
  try {
    const response = await axios.post<AboutCart>('https://localhost:5445/api/Carts/check-current-cart', payload);

    if (response.status === 204) {
      console.log('response.status === 204');
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

    } else if (isAboutCart(data)) {
      return {
        isSuccess: true,
        entity: data
      };
      
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    throw new Error("Failed to retrive information about cart content because of unexpected error");
  }
}