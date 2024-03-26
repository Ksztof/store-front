import { createSlice } from '@reduxjs/toolkit';
import { CartLocStorState } from '../../types/cartTypes';
import { addProductToRedStor } from '../actions/cartLocStorActions';

const initialState: CartLocStorState = {
  loading: false,
  cartLocStorData: [],
  error: null,
};

const cartLocStorSlice = createSlice({
  name: 'cartLocStor',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addProductToRedStor.pending, (cartLocStorState: CartLocStorState) => {
        cartLocStorState.loading = true;
        cartLocStorState.error = null;
      })
      .addCase(addProductToRedStor.fulfilled, (cartLocStorState: CartLocStorState, action) => {
        cartLocStorState.loading = false;
        cartLocStorState.cartLocStorData = action.payload;
      })
      .addCase(addProductToRedStor.rejected, (cartLocStorState: CartLocStorState, action) => {
        cartLocStorState.loading = false;
        cartLocStorState.error = action.payload ?? "An unexpected error occurred. Please try again.";
      });
  },
});

export default cartLocStorSlice.reducer;
