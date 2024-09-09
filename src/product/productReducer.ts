import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getProducts } from './productActions';
import { ApiError } from '../shared/sharedTypes';
import { ProductState, ProductDetails } from './productTypes';

const initialState: ProductState = {
  loading: false,
  productsData: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: ProductState) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state: ProductState, action: PayloadAction<void | ProductDetails[]>) => {
        state.loading = false;
        state.productsData = action.payload || [];
      })
      .addCase(getProducts.rejected, (state: ProductState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
