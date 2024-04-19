import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartContent } from '../../api/cartService';
import { AboutCart } from '../../types/cartTypes';
import { addCartContentToLocStor, addProductToLocStor, getProductsFromLocStor } from '../../utils/cartUtils';
import { ProductPayload } from '../../types/productTypes';
import { ApiError, ApiResponse, ErrorContent } from '../../types/apiResponseTypes';
import { isApiError } from '../../utils/responseUtils';

export const getCartContentApi = createAsyncThunk<void, void, { rejectValue: string | ErrorContent }>(
  'cart/getCartContentApi ',
  async (_, { rejectWithValue }) => {
    try {
      const data: ApiResponse<AboutCart> = await getCartContent();
      if (isApiError(data)) {
        const error: ErrorContent = data.error;
        return rejectWithValue(error);
      } else {
        addCartContentToLocStor(data.entity);
      }
    } catch (error: unknown) {
      console.error('Unexpected error:', error);
      return rejectWithValue('The contents of the shopping cart cannot be downloaded, an unexpected error occurred');
    }
  }
);

export const addProductToRedStor = createAsyncThunk<
  AboutCart | null,
  ProductPayload,
  { rejectValue: string }>(
    'cartLocStor/addProduct ',
    async (payload: ProductPayload, { rejectWithValue }) => {
      try {
        addProductToLocStor(payload.product, payload.quantity);

        const updatedCart: AboutCart | null = getProductsFromLocStor();

        return updatedCart;
      } catch (error: unknown) {
        console.error(error);

        return rejectWithValue("Can't update cart");
      }
    }
  );