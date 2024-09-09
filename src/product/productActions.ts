import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from './productService';
import { isApiError, isNoContentResponse } from '../shared/validation/typeGuards/typeGuardsUtils';
import { ApiError, OkApiResponse, NoContentApiResponse } from '../shared/sharedTypes';
import { ProductDetails } from './productTypes';

export const getProducts = createAsyncThunk<
  void | ProductDetails[],
  void,
  { rejectValue: ApiError | string }>(
    'product/getProducts ',
    async (_, { rejectWithValue }) => {
      try {
        const response: OkApiResponse<ProductDetails[]> | NoContentApiResponse | ApiError = await getAllProducts();
        if (isApiError(response)) {
          return rejectWithValue(response);
        }

        if (isNoContentResponse(response)) {
          return;
        }

        return response.entity;

      } catch (error: unknown) {
        console.error("getProducts error: ", error);
        return rejectWithValue("Unable to download products, an unexpected error occurred");
      }
    }
  );