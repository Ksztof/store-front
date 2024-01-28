import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartContent } from '../../api/cartService';

export const checkCart  = createAsyncThunk<AboutCart, void>(
  'cart/getCartContent ',
  async (_, { rejectWithValue }) => {
    try {
      const data: AboutCart = await getCartContent();
      
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);