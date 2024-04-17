import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../../types/cartTypes';
import { getCartContentApi } from '../actions/cartActions';

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
      .addCase(getCartContentApi.pending, (cartState) => {
        cartState.loading = true;
        cartState.error = null;
      })
      .addCase(getCartContentApi.fulfilled, (cartState, action) => {
        cartState.loading = false;
      })
      .addCase(getCartContentApi.rejected, (cartState: any, action) => {  // change any for CartState
        cartState.loading = false;
        cartState.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
