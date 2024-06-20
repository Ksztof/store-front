import axios from 'axios';
import { AboutCart, NewProductsForApi, checkCurrentCartPayload } from '../types/cartTypes';
import { isAboutCart, isProblemDetails } from '../utils/responseUtils';
import { ApiError } from '../types/errorTypes';
import { NoContentApiResponse } from '../types/noContentApiResponse';
import { OkApiResponse } from '../types/okApiResponse';

axios.defaults.withCredentials = true;

export const getCartContent = async (): Promise<NoContentApiResponse | OkApiResponse<AboutCart> | ApiError> => {
  try {
    const response = await axios.get<AboutCart>('https://localhost:5004/api/Carts', {});

    if (response.status === 204) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    } else {
      if(isAboutCart(response.data)){
        const responseDetails: OkApiResponse<AboutCart> = { isSuccess: true, entity: response.data };
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

export const saveCartContent = async (cartContent: NewProductsForApi): Promise<NoContentApiResponse | OkApiResponse<AboutCart> | ApiError> => {
  try {
    const response = await axios.put<AboutCart>('https://localhost:5004/api/Carts', cartContent);
    if (response.status === 204) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    } else {
      if(isAboutCart(response.data)){
        const responseDetails: OkApiResponse<AboutCart> = { isSuccess: true, entity: response.data };
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

export const checkCurrentCart = async (payload: checkCurrentCartPayload): Promise<NoContentApiResponse | OkApiResponse<AboutCart> | ApiError> => {
  try {
    const response = await axios.post<AboutCart>('https://localhost:5004/api/Carts/check-current-cart', payload);
    if (response.status === 204) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    } else {
      if(isAboutCart(response.data)){
        const responseDetails: OkApiResponse<AboutCart> = { isSuccess: true, entity: response.data };
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