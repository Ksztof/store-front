import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentState } from "../../initialValues/paymentInitials";
import { confirmPayment, getClientSecret, resetPayment, updatePaymentIntent, updatePaymentStatus, updatePaymentStatusSuccess } from "../actions/paymentActions";
import { ReducerStates } from "../../types/sharedTypes";
import { apiErrorInitialValue } from "../../initialValues/authInitials";
import { ApiError } from "../../types/errorTypes";

const initialState: PaymentState = {
  loading: false,
  status: ReducerStates.Idle,
  error: apiErrorInitialValue,
  clientSecret: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientSecret.pending, (state: PaymentState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(getClientSecret.fulfilled, (state: PaymentState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.status = ReducerStates.Pending;
        if (action.payload) {
          state.clientSecret = action.payload;
        }
      })
      .addCase(getClientSecret.rejected, (state: PaymentState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
        state.status = ReducerStates.Rejected;
      })

      .addCase(updatePaymentIntent.pending, (state: PaymentState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(updatePaymentIntent.fulfilled, (state: PaymentState, action: PayloadAction<void>) => {
        state.loading = false;
        state.status = ReducerStates.Pending;
      })
      .addCase(updatePaymentIntent.rejected, (state: PaymentState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
        state.status = ReducerStates.Rejected;
      })

      .addCase(confirmPayment.pending, (state: PaymentState) => {
        state.loading = true;
        state.status = ReducerStates.Pending;
      })
      .addCase(confirmPayment.fulfilled, (state: PaymentState, action: PayloadAction<void>) => {
        state.loading = false;
        state.status = ReducerStates.Fulfilled;
      })
      .addCase(confirmPayment.rejected, (state: PaymentState, action: PayloadAction<ApiError | string | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
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