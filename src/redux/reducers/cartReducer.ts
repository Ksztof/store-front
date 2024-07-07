import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiErrorInitialValue } from "../../initialValues/authInitials";
import { cartDataInitialValues } from "../../initialValues/cartInitials";
import { CartState, AboutCart } from "../../types/cartTypes";
import { ApiError } from "../../types/errorTypes";
import { synchronizeCartWithApi, addProductToCart, adjustProductQuantity, changeProductInCartQuantity, changeCartContentGlobally, setCurrentCart, resetCart } from "../actions/cartActions";


const initialState: CartState = {
  loading: false,
  cartData: cartDataInitialValues,
  error: apiErrorInitialValue,
  isEmpty: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(synchronizeCartWithApi.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(synchronizeCartWithApi.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        if(action.payload){
          state.cartData = action.payload;
          state.isEmpty = false;
        }
      })
      .addCase(synchronizeCartWithApi.rejected, (state: CartState, action: PayloadAction<ApiError | string | undefined>) => {  
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
        state.isEmpty = action.payload.aboutProductsInCart.length === 0;
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
        state.isEmpty = action.payload.aboutProductsInCart.length === 0;
      })
      .addCase(changeProductInCartQuantity.rejected, (state: CartState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(changeCartContentGlobally.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(changeCartContentGlobally.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        if(action.payload)
          state.cartData = action.payload;
      })
      .addCase(changeCartContentGlobally.rejected, (state: CartState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(setCurrentCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(setCurrentCart.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        if(action.payload)
          state.cartData = action.payload;
      })
      .addCase(setCurrentCart.rejected, (state: CartState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetCart, () => initialState);
  },
});


export default cartSlice.reducer;
