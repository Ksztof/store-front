import {  PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartContent, CartSliceState, CartState } from '../../types/cartTypes';
import { addProductToCart, synchronizeCartWithApi  } from '../actions/cartActions';
import { getProductsFromLocStor } from '../../utils/cartUtils';

const initialApiCartSyncState: CartState = {
  loading: false,
  cartData: null,
  error: "",
};

const initialStateAddProductToCart: CartContent = {
  loading: false,
  products: getProductsFromLocStor(),
  error: "",
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    syncCartWithApi: initialApiCartSyncState,
    cartContent: initialStateAddProductToCart
  } as CartSliceState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(synchronizeCartWithApi.pending, (state: CartSliceState) => {
        state.syncCartWithApi.loading = true;
      })
      .addCase(synchronizeCartWithApi.fulfilled, (state: CartSliceState) => {
        state.syncCartWithApi.loading = false;
      })
      .addCase(synchronizeCartWithApi.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {  
        state.syncCartWithApi.loading = false;
        state.syncCartWithApi.error = action.payload;
      })
      

      .addCase(addProductToCart.pending, (state: CartSliceState) => {
        state.cartContent.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state: CartSliceState, action) => {
        state.cartContent.loading = false;
        state.cartContent.products = action.payload;
      })
      .addCase(addProductToCart.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartContent.loading = false;
        state.cartContent.error = action.payload;
      });
  },
});


export default cartSlice.reducer;
