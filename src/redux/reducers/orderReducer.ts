import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../../types/productTypes';
import { getProducts } from '../actions/productActions';
import { OrderState, initialOrderData } from '../../initialValues/orderInitials';
import { makeOrder } from '../actions/orderActions';
import { OrderResponse } from '../../types/orderTypes';

const initialState: OrderState = {
  loading: false,
  orderData: initialOrderData,
  error: "",
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state: OrderState) => {
        state.loading = true;
      })
      .addCase(makeOrder.fulfilled, (state: OrderState, action: PayloadAction<OrderResponse>) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(makeOrder.rejected, (state: OrderState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
