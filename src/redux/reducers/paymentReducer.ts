import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentState } from "../../initialValues/paymentInitials";
import { resetPayment, startOrderProcess, startPaymentConfirmation, updatePaymentStatus, updatePaymentStatusSuccess } from "../actions/paymentActions";
import { ReducerStates } from "../../types/sharedTypes";
import { apiErrorInitialValue } from "../../initialValues/authInitials";
import { ApiError } from "../../types/errorTypes";
import { PaymentIntent } from "@stripe/stripe-js";

const initialState: PaymentState = {
  loading: false,
  status: ReducerStates.Idle,
  error: apiErrorInitialValue,
  paymentIntent: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startOrderProcess.pending, (state: PaymentState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(startOrderProcess.fulfilled, (state: PaymentState, action: PayloadAction<PaymentIntent | undefined>) => {
        state.loading = false;
        state.status = ReducerStates.Pending;
        if (action.payload) {
          state.paymentIntent = action.payload;
        }
      })
      .addCase(startOrderProcess.rejected, (state: PaymentState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload)
          state.error = action.payload;
        state.status = ReducerStates.Rejected;
      })

      .addCase(startPaymentConfirmation.pending, (state: PaymentState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(startPaymentConfirmation.fulfilled, (state: PaymentState, action: PayloadAction<void>) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(startPaymentConfirmation.rejected, (state: PaymentState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload)
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
        if (action.payload)
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
        if (action.payload)
          state.error = action.payload;
      })

      .addCase(resetPayment, () => initialState);
  },
});

export default paymentSlice.reducer;