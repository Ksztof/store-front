import axios from 'axios';
import { ProductDetails } from '../types/productTypes';
import { isProblemDetails, isProductDetails } from '../utils/responseUtils';
import { ApiResponseNoContent } from '../types/apiResponseWithEmpty';
import { ApiError } from '../types/errorTypes';
import { ApiResponse } from '../types/apiResponse';

axios.defaults.withCredentials = true;

export const getAllProducts = async (): Promise<ApiResponse<ProductDetails[]> | ApiResponseNoContent | ApiError> => {
  try {
    const response = await axios.get<ProductDetails[]>('https://localhost:5004/api/Products');

    if (isProductDetails(response.data)) {
      const responseDetails: ApiResponse<ProductDetails[]> = { isSuccess: true, entity: response.data };
      return responseDetails;
    } else {
      const responseDetails: ApiResponseNoContent = { isSuccess: true, isEmpty: true };
      return responseDetails;
    }
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error("Failed to get all products because of unexpected error");
  };
};