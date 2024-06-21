import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDetails } from '../../types/productTypes';
import { getAllProducts } from '../../api/productService';
import { isApiError, isNoContentResponse } from '../../utils/responseUtils';
import { ApiError } from '../../types/errorTypes';
import { NoContentApiResponse } from '../../types/noContentApiResponse';
import { OkApiResponse } from '../../types/okApiResponse';

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