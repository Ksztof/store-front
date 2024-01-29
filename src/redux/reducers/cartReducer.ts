import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../../types/cartTypes';
import { checkCart } from '../actions/cartActions';

const initialState: CartState = {
  loading: false,
  cartData: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(checkCart.pending, (cartState) => {
        cartState.loading = true;
        cartState.error = null;
      })
      .addCase(checkCart.fulfilled, (cartState, action) => {
        cartState.loading = false;
        cartState.cartData = action.payload;
      })
      .addCase(checkCart.rejected, (cartState: any, action) => {
        cartState.loading = false;
        cartState.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
