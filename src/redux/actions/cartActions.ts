import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartContent } from '../../api/cartService';
import { AboutCart } from '../../types/cartTypes';
import { addCartContentToLocStor, getProductsFromLocStor, mapProductDetailsToCheckCart } from '../../utils/cartUtills';

//Create key in local storage even if cart in api is empty
export const getCartContentApi = createAsyncThunk
  (
    'cart/getCartContentApi ',
    async (_, { rejectWithValue }) => {
      try {
        const data: AboutCart = await getCartContent();
        addCartContentToLocStor(data);
      } catch (error: any) {
        console.error(error);
        if (!error.response) {
          throw error;
        }

        return rejectWithValue(error.response.data.Error.description);
      }
    }
  );