import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartDataInitialValues } from "../../initialValues/cartInitials";
import { CartState, AboutCart } from "../../types/cartTypes";
import { synchronizeCartWithApi, addProductToCart, adjustProductQuantity, changeProductInCartQuantity, changeCartContentGlobally, setCurrentCart, resetCart, clearCart } from "../actions/cartActions";


const initialState: CartState = {
  loading: false,
  cartData: cartDataInitialValues,
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
        if (action.payload) {
          state.cartData = action.payload;
          const numberOfProductsInCart: number = 0;
          state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
        }
      })
      .addCase(synchronizeCartWithApi.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(addProductToCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state: CartState, action: PayloadAction<AboutCart>) => {
        state.loading = false;
        state.cartData = action.payload;
        const numberOfProductsInCart: number = 0;
        state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
      })
      .addCase(addProductToCart.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(adjustProductQuantity.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(adjustProductQuantity.fulfilled, (state: CartState, action: PayloadAction<AboutCart>) => {
        state.loading = false;
        state.cartData = action.payload;
        const numberOfProductsInCart: number = 0;
        state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
      })
      .addCase(adjustProductQuantity.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(changeProductInCartQuantity.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(changeProductInCartQuantity.fulfilled, (state: CartState, action: PayloadAction<AboutCart>) => {
        state.loading = false;
        state.cartData = action.payload;
        const numberOfProductsInCart: number = 0;
        state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
      })
      .addCase(changeProductInCartQuantity.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(changeCartContentGlobally.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(changeCartContentGlobally.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        if (action.payload)
          state.cartData = action.payload;
        const numberOfProductsInCart: number = 0;
        state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
      })
      .addCase(changeCartContentGlobally.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(setCurrentCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(setCurrentCart.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        if (action.payload)
          state.cartData = action.payload;
      })
      .addCase(setCurrentCart.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(clearCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state: CartState) => {
        state.loading = false;
      })
      .addCase(clearCart.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(resetCart, () => initialState);
  },
});


export default cartSlice.reducer;
