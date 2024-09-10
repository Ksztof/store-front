import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, AboutCart } from "./cartTypes";
import { cartDataInitialValues } from "./cartConstants";
import { addProductToCart, adjustProductQuantity, changeProductInCartQuantity, setCurrentCart, clearCart, deleteProductFromCart, resetCart, getCartContent, saveCartContent } from "./cartActions";

const initialState: CartState = {
  loading: false,
  cartData: cartDataInitialValues,
  isEmpty: true,
  isCartCleared: false,
  isCartSaved: false,
  isCartChanged: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartContent.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(getCartContent.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        if (action.payload) {
          state.cartData = action.payload;
          const numberOfProductsInCart: number = 0;
          state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
          state.isCartSaved = true;
        }
      })
      .addCase(getCartContent.rejected, (state: CartState) => {
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
        state.isCartCleared = false;
        state.isCartSaved = false;
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
        state.isCartCleared = false;
        state.isCartSaved = false;
        state.isCartChanged = true;
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
        state.isCartCleared = false;
        state.isCartSaved = false;
        state.isCartChanged = true;
      })
      .addCase(changeProductInCartQuantity.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(saveCartContent.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(saveCartContent.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        
        if (action.payload) {
          state.cartData = action.payload;
        }

        const numberOfProductsInCart: number = 0;
        state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
        state.isCartSaved = true;
        state.isCartChanged = false;
      })
      .addCase(saveCartContent.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(setCurrentCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(setCurrentCart.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;

        if (action.payload) {
          state.cartData = action.payload;
        }
      })
      .addCase(setCurrentCart.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(clearCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state: CartState) => {
        state.loading = false;
        state.isCartCleared = true;
        state.isCartChanged = true;
      })
      .addCase(clearCart.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(deleteProductFromCart.pending, (state: CartState) => {
        state.loading = true;
      })
      .addCase(deleteProductFromCart.fulfilled, (state: CartState, action: PayloadAction<void | AboutCart>) => {
        state.loading = false;
        if (action.payload) {
          state.cartData = action.payload;
        }
        const numberOfProductsInCart: number = 0;
        state.isEmpty = state.cartData.aboutProductsInCart.length === numberOfProductsInCart;
        state.isCartCleared = false;
        state.isCartSaved = false;
        state.isCartChanged = true;
      })
      .addCase(deleteProductFromCart.rejected, (state: CartState) => {
        state.loading = false;
      })

      .addCase(resetCart, () => initialState);
  },
});


export default cartSlice.reducer;
