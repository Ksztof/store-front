import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderState, initialOrderData } from '../../initialValues/orderInitials';
import { makeOrder, resetOrder } from '../actions/orderActions';
import { OrderResponse } from '../../types/orderTypes';
import { ReducerStates } from '../../types/sharedTypes';

const initialState: OrderState = {
  loading: false,
  orderData: initialOrderData,
  error: "",
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
      .addCase(makeOrder.rejected, (state: OrderState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
        state.status = ReducerStates.Rejected;
      })
      
      .addCase(resetOrder, () => initialState);
  },
});

export default orderSlice.reducer;
