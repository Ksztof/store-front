import axios from 'axios';
import { AboutCart, NewProductsForApi, checkCurrentCartPayload } from '../types/cartTypes';
import { isAboutCart, isProblemDetails } from '../utils/responseUtils';
import { ApiError } from '../types/errorTypes';
import { ApiResponseNoContent } from '../types/apiResponseWithEmpty';
import { ApiResponse } from '../types/apiResponse';

axios.defaults.withCredentials = true;

export const getCartContent = async (): Promise<ApiResponseNoContent | ApiResponse<AboutCart> | ApiError> => {
  try {
    const response = await axios.get<AboutCart>('https://localhost:5004/api/Carts', {});

    if (response.status === 204) {
      const responseDetails: ApiResponseNoContent = { isSuccess: true, isEmpty: true };
      return responseDetails;
    } else {
      if(isAboutCart(response.data)){
        const responseDetails: ApiResponse<AboutCart> = { isSuccess: true, entity: response.data };
        return responseDetails;
      }
      throw new Error();
    }
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error("Failed to get cart content because of unexpected error");
  };
};

export const saveCartContent = async (cartContent: NewProductsForApi): Promise<ApiResponseNoContent | ApiResponse<AboutCart> | ApiError> => {
  try {
    const response = await axios.put<AboutCart>('https://localhost:5004/api/Carts', cartContent);
    if (response.status === 204) {
      const responseDetails: ApiResponseNoContent = { isSuccess: true, isEmpty: true };
      return responseDetails;
    } else {
      if(isAboutCart(response.data)){
        const responseDetails: ApiResponse<AboutCart> = { isSuccess: true, entity: response.data };
        return responseDetails;
      }
      throw new Error();
    }
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error("Failed to save cart content because of unexpected error");
  };
};

export const checkCurrentCart = async (payload: checkCurrentCartPayload): Promise<ApiResponseNoContent | ApiResponse<AboutCart> | ApiError> => {
  try {
    const response = await axios.post<AboutCart>('https://localhost:5004/api/Carts/check-current-cart', payload);
    if (response.status === 204) {
      const responseDetails: ApiResponseNoContent = { isSuccess: true, isEmpty: true };
      return responseDetails;
    } else {
      if(isAboutCart(response.data)){
        const responseDetails: ApiResponse<AboutCart> = { isSuccess: true, entity: response.data };
        return responseDetails;
      }
      throw new Error();
    }
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error("Failed to check current cart because of unexpected error");
  };
};