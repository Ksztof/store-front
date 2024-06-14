import {  PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AboutCart, CartState } from '../../types/cartTypes';
import { addProductToCart, adjustProductQuantity, changeCartContentGlobally, changeProductInCartQuantity, resetCart, setCurrentCart, synchronizeCartWithApi  } from '../actions/cartActions';

const initialState: CartState = {
  loading: false,
  cartData: {
    totalCartValue: 0,
    aboutProductsInCart: [],
    createdAt: ""},
  error: "",
  isEmpty: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(synchronizeCartWithApi.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(synchronizeCartWithApi.fulfilled, (state: CartState, action: PayloadAction<AboutCart | null>) => {// PayloadAction<AboutCart | null> resolve null value
        state.loading = false;
        if(action.payload !== null){
          state.cartData = action.payload;
          state.isEmpty = false;
        }
      })
      .addCase(synchronizeCartWithApi.rejected, (state: CartState, action: PayloadAction<string | undefined>) => {  
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProductToCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state: CartState, action: PayloadAction<AboutCart>) => {// PayloadAction<AboutCart | null> resolve null value
        state.loading = false;
        state.cartData = action.payload;
        state.isEmpty = false;
      })
      .addCase(addProductToCart.rejected, (state: CartState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(adjustProductQuantity.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(adjustProductQuantity.fulfilled, (state: CartState, action: PayloadAction<AboutCart>) => {// PayloadAction<AboutCart | null> resolve null value
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(adjustProductQuantity.rejected, (state: CartState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(changeProductInCartQuantity.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(changeProductInCartQuantity.fulfilled, (state: CartState, action: PayloadAction<AboutCart>) => {
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(changeProductInCartQuantity.rejected, (state: CartState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(changeCartContentGlobally.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(changeCartContentGlobally.fulfilled, (state: CartState, action: PayloadAction<AboutCart | null>) => {
        state.loading = false;
        if(action.payload !== null)
          state.cartData = action.payload;
      })
      .addCase(changeCartContentGlobally.rejected, (state: CartState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(setCurrentCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(setCurrentCart.fulfilled, (state: CartState, action: PayloadAction<AboutCart | null>) => {
        state.loading = false;
        if(action.payload !== null)
          state.cartData = action.payload;
      })
      .addCase(setCurrentCart.rejected, (state: CartState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetCart, () => initialState);
  },
});


export default cartSlice.reducer;
