import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductDetails, ProductState } from '../../types/productTypes';
import { getProducts } from '../actions/productActions';
import { ApiError } from '../../types/errorTypes';
import { apiErrorInitialValue } from '../../initialValues/authInitials';

const initialState: ProductState = {
  loading: false,
  productsData: [],
  error: apiErrorInitialValue,
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
      .addCase(getProducts.fulfilled, (state: ProductState, action: PayloadAction<void | ProductDetails[]>) => {
        state.loading = false;
        state.productsData = action.payload || [];
      })
      .addCase(getProducts.rejected, (state: ProductState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
