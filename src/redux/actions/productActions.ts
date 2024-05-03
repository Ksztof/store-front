import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDetails } from '../../types/productTypes';
import { getAllProducts } from '../../api/productService';
import { ApiResponse, ErrorContent } from '../../types/apiResponseTypes';
import { isApiError } from '../../utils/responseUtils';

export const getProducts  = createAsyncThunk<
ProductDetails[], 
void, 
{ rejectValue: string | undefined}>(
  'product/getProducts ',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<ProductDetails[]> = await getAllProducts();
      if (isApiError(response)) {
        const error: ErrorContent = response.error;
        return rejectWithValue(`Error code: ${error.code} Error description: ${error.description}`);
      } else {
        return response.entity;
      }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return rejectWithValue("Products cannot be downloaded, an unexpected error occurred");
    }
  }
);