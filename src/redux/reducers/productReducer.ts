import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../../types/productTypes';
import { getProducts } from '../actions/productActions';

const initialState: ProductState = {
  loading: false,
  productsData: [],
  error: "",
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: ProductState) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state: ProductState, action) => {
        state.loading = false;
        state.productsData = action.payload || [];
      })
      .addCase(getProducts.rejected, (state: ProductState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
