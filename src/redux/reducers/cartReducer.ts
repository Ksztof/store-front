import {  PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartContent, CartSliceState, CartState } from '../../types/cartTypes';
import { addProductToCart, adjustProductQuantity, changeCartContentGlobally, changeProductInCartQuantity, synchronizeCartWithApi  } from '../actions/cartActions';
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
      .addCase(synchronizeCartWithApi.fulfilled, (state: CartSliceState, action) => {
        state.syncCartWithApi.loading = false;
        state.cartContent.products = action.payload;
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
      })
      
      .addCase(adjustProductQuantity.pending, (state: CartSliceState) => {
        state.cartContent.loading = true;
      })
      .addCase(adjustProductQuantity.fulfilled, (state: CartSliceState, action) => {
        state.cartContent.loading = false;
        state.cartContent.products = action.payload;
      })
      .addCase(adjustProductQuantity.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartContent.loading = false;
        state.cartContent.error = action.payload;
      })
      
      .addCase(changeProductInCartQuantity.pending, (state: CartSliceState) => {
        state.cartContent.loading = true;
      })
      .addCase(changeProductInCartQuantity.fulfilled, (state: CartSliceState, action) => {
        state.cartContent.loading = false;
        state.cartContent.products = action.payload;
      })
      .addCase(changeProductInCartQuantity.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartContent.loading = false;
        state.cartContent.error = action.payload;
      })
      
      .addCase(changeCartContentGlobally.pending, (state: CartSliceState) => {
        state.cartContent.loading = true;
      })
      .addCase(changeCartContentGlobally.fulfilled, (state: CartSliceState, action) => {
        state.cartContent.loading = false;
        state.cartContent.products = action.payload;
      })
      .addCase(changeCartContentGlobally.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartContent.loading = false;
        state.cartContent.error = action.payload;
      });
  },
});


export default cartSlice.reducer;
