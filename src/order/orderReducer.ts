import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderState, initialOrderData } from './orderConstants';
import { OrderResponse } from './orderTypes';
import { ReducerStates } from '../shared/sharedTypes';
import { makeOrder, resetOrder } from './orderActions';

const initialState: OrderState = {
  loading: false,
  orderData: initialOrderData,
  status: ReducerStates.Idle
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
        state.status = ReducerStates.Pending;
      })
      .addCase(makeOrder.fulfilled, (state: OrderState, action: PayloadAction<OrderResponse>) => {
        state.loading = false;
        state.orderData = action.payload;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(makeOrder.rejected, (state: OrderState) => {
        state.loading = false;
        state.status = ReducerStates.Rejected;
      })

      .addCase(resetOrder, () => initialState);
  },
});

export default orderSlice.reducer;
