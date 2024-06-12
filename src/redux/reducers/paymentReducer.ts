import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentState } from "../../initialValues/paymentInitials";
import { payWithCard, resetPayment, updatePaymentStatus, updatePaymentStatusSuccess } from "../actions/paymentActions";
import { ReducerStates } from "../../types/sharedTypes";

const initialState: PaymentState = {
  loading: false,
  status: ReducerStates.Idle,
  error: "",
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(payWithCard.pending, (state: PaymentState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(payWithCard.fulfilled, (state: PaymentState) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(payWithCard.rejected, (state: PaymentState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
        state.status = ReducerStates.Rejected;
      })

      .addCase(updatePaymentStatus.pending, (state: PaymentState) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatus.fulfilled, (state: PaymentState) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(updatePaymentStatus.rejected, (state: PaymentState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updatePaymentStatusSuccess.pending, (state: PaymentState) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatusSuccess.fulfilled, (state: PaymentState) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(updatePaymentStatusSuccess.rejected, (state: PaymentState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(resetPayment, () => initialState);
  },
});

export default paymentSlice.reducer;