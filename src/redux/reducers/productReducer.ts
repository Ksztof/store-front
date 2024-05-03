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
      .addCase(getProducts.pending, (productState: ProductState) => {
        productState.loading = true;
      })
      .addCase(getProducts.fulfilled, (productState: ProductState, action) => {
        productState.loading = false;
        productState.productsData = action.payload;
      })
      .addCase(getProducts.rejected, (productState: ProductState, action: PayloadAction<string | undefined>) => {
        productState.loading = false;
        productState.error = action.payload;
      });
  },
});

export default productSlice.reducer;
