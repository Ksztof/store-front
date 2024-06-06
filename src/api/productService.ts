import axios from 'axios';
import { ProductDetails } from '../types/productTypes';
import { isProductDetails } from '../utils/responseUtils';
import { ApiResponseWithEmpty } from '../types/apiResponseWithEmpty';

axios.defaults.withCredentials = true;

export const getAllProducts = async (): Promise<ApiResponseWithEmpty<ProductDetails[]>> => {
  try {
    const response = await axios.get<ProductDetails[]>('https://localhost:5004/api/Products');
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
        isEmpty: true
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

