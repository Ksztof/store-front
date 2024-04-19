import {  createSlice } from '@reduxjs/toolkit';
import { AboutCart, CartContent, CartState } from '../../types/cartTypes';
import { addProductToRedStor, getCartContentApi } from '../actions/cartActions';
import { getProductsFromLocStor } from '../../utils/cartUtils';

const initialStateGetCartApi: CartState = {
  loading: false,
  cartData: null,
  error: null,
};

const initialStateAddProductToRedStor: CartContent = {
  loading: false,
  products: getProductsFromLocStor(),
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    getCartApi: initialStateGetCartApi,
    cartContent: initialStateAddProductToRedStor
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartContentApi.pending, (state) => {
        state.getCartApi.loading = true;
        state.getCartApi.error = null;
      })
      .addCase(getCartContentApi.fulfilled, (state) => {
        state.getCartApi.loading = false;
      })
      .addCase(getCartContentApi.rejected, (state: any, action) => {  
        state.getCartApi.loading = false;
        state.getCartApi.error = action.payload;
      })
      

      .addCase(addProductToRedStor.pending, (state) => {
        state.cartContent.loading = true;
        state.cartContent.error = null;
      })
      .addCase(addProductToRedStor.fulfilled, (state, action) => {
        state.cartContent.loading = false;
        state.cartContent.products = action.payload;
      })
      .addCase(addProductToRedStor.rejected, (state, action) => {
        state.cartContent.loading = false;
        state.cartContent.error = action.payload ?? "An unexpected error occurred. Please try again.";
      });
  },
});


export default cartSlice.reducer;
