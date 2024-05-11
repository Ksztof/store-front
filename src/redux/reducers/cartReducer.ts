import {  PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AboutCart, CartDetails, CartSliceState, CartState } from '../../types/cartTypes';
import { addProductToCart, adjustProductQuantity, changeCartContentGlobally, changeProductInCartQuantity, setCurrentCart, synchronizeCartWithApi  } from '../actions/cartActions';
import { getProductsFromLocStor } from '../../utils/localStorageUtils';

const initialApiCartSyncState: CartState = {//think about naming conventions
  loading: false,
  cartData: {
    totalCartValue: 0,
    aboutProductsInCart: [],
    createdAt: ""},
  error: "",
};

const initialStateAddProductToCart: CartDetails = {
  loading: false,
  aboutCart: getProductsFromLocStor(),
  error: "",
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    syncCartWithApi: initialApiCartSyncState,
    cartDetails: initialStateAddProductToCart
  } as CartSliceState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(synchronizeCartWithApi.pending, (state: CartSliceState) => {
        state.syncCartWithApi.loading = true;
      })
      .addCase(synchronizeCartWithApi.fulfilled, (state: CartSliceState, action: PayloadAction<AboutCart | null>) => {// PayloadAction<AboutCart | null> resolve null value
        state.syncCartWithApi.loading = false;
        if(action.payload !== null)
          state.cartDetails.aboutCart = action.payload;
      })
      .addCase(synchronizeCartWithApi.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {  
        state.syncCartWithApi.loading = false;
        state.syncCartWithApi.error = action.payload;
      })

      .addCase(addProductToCart.pending, (state: CartSliceState) => {
        state.cartDetails.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state: CartSliceState, action: PayloadAction<AboutCart | null>) => {// PayloadAction<AboutCart | null> resolve null value
        state.cartDetails.loading = false;
        state.cartDetails.aboutCart = action.payload;
      })
      .addCase(addProductToCart.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartDetails.loading = false;
        state.cartDetails.error = action.payload;
      })
      
      .addCase(adjustProductQuantity.pending, (state: CartSliceState) => {
        state.cartDetails.loading = true;
      })
      .addCase(adjustProductQuantity.fulfilled, (state: CartSliceState, action: PayloadAction<AboutCart | null>) => {// PayloadAction<AboutCart | null> resolve null value
        state.cartDetails.loading = false;
        state.cartDetails.aboutCart = action.payload;
      })
      .addCase(adjustProductQuantity.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartDetails.loading = false;
        state.cartDetails.error = action.payload;
      })
      
      .addCase(changeProductInCartQuantity.pending, (state: CartSliceState) => {
        state.cartDetails.loading = true;
      })
      .addCase(changeProductInCartQuantity.fulfilled, (state: CartSliceState, action: PayloadAction<AboutCart>) => {
        state.cartDetails.loading = false;
        state.cartDetails.aboutCart = action.payload;
      })
      .addCase(changeProductInCartQuantity.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartDetails.loading = false;
        state.cartDetails.error = action.payload;
      })
      
      .addCase(changeCartContentGlobally.pending, (state: CartSliceState) => {
        state.cartDetails.loading = true;
      })
      .addCase(changeCartContentGlobally.fulfilled, (state: CartSliceState, action: PayloadAction<AboutCart | null>) => {// PayloadAction<AboutCart | null> resolve null value
        state.cartDetails.loading = false;
        if(action.payload !== null)
          state.cartDetails.aboutCart = action.payload;
      })
      .addCase(changeCartContentGlobally.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartDetails.loading = false;
        state.cartDetails.error = action.payload;
      })
      
      .addCase(setCurrentCart.pending, (state: CartSliceState) => {
        state.cartDetails.loading = true;
      })
      .addCase(setCurrentCart.fulfilled, (state: CartSliceState, action: PayloadAction<AboutCart | null>) => {// PayloadAction<AboutCart | null> resolve null value
        state.cartDetails.loading = false;
        if(action.payload !== null)
          state.cartDetails.aboutCart = action.payload;
      })
      .addCase(setCurrentCart.rejected, (state: CartSliceState, action: PayloadAction<string | undefined>) => {
        state.cartDetails.loading = false;
        state.cartDetails.error = action.payload;
      });
  },
});


export default cartSlice.reducer;
