import axios from 'axios';
import { ProductDetails } from '../types/productTypes';
import { isErrorContent, isProductDetails } from '../utils/responseUtils';
import { ApiResponse } from '../types/apiResponseTypes';

axios.defaults.withCredentials = true;

export const getAllProducts = async (): Promise<ApiResponse<ProductDetails[]>> => {
  try {
    const response = await axios.get<ProductDetails[]>('https://localhost:5445/api/Products');
    const data = response.data;

    if (!isProductDetails(data)) {
      return {
        isSuccess: false,
        error: {
          code: "FORMAT_ERROR",
          description: "Invalid API response format"
        }
      };
    }

    if (data.length === 0) {
      return {
        isSuccess: true,
        entity: []
      };
    }

    return {
      isSuccess: true,
      entity: data
    };
  } catch (error) {
    throw new Error("Failed to download products because of unexpected error");
  }
};

