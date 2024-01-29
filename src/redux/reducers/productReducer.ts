import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../../types/productTypes';
import { getProducts } from '../actions/productActions';

const initialState: ProductState = {
  loading: false,
  productsData: [],
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (cartState) => {
        cartState.loading = true;
        cartState.error = null;
      })
      .addCase(getProducts.fulfilled, (cartState, action) => {
        cartState.loading = false;
        cartState.productsData = action.payload;
      })
      .addCase(getProducts.rejected, (cartState: any, action) => {
        cartState.loading = false;
        cartState.error = action.payload;
      });
  },
});

export default productSlice.reducer;
