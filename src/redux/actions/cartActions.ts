import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartContent } from '../../api/cartService';
import { AboutCart } from '../../types/cartTypes';

export const checkCart  = createAsyncThunk<AboutCart, void>(
  'cart/getCartContent ',
  async (_, { rejectWithValue }) => {
    try {
      const data: AboutCart = await getCartContent();

      return data;
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.Error.description);
    }
  }
);