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
      .addCase(getProducts.pending, (productState) => {
        productState.loading = true;
        productState.error = null;
      })
      .addCase(getProducts.fulfilled, (productState, action) => {
        productState.loading = false;
        productState.productsData = action.payload;
      })
      .addCase(getProducts.rejected, (productState: any, action) => { // change any for ProductState
        productState.loading = false;
        productState.error = action.payload;
      });
  },
});

export default productSlice.reducer;
