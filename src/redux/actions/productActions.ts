import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDetails } from '../../types/productTypes';
import { getAllProducts } from '../../api/productService';

export const getProducts  = createAsyncThunk<ProductDetails[], void>(
  'product/getProducts ',
  async (_, { rejectWithValue }) => {
    try {
      const data: ProductDetails[] = await getAllProducts();
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);