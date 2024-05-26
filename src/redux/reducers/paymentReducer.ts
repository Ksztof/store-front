import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentState } from "../../initialValues/paymentInitials";
import { payWithCard, updatePaymentStatus } from "../actions/paymentActions";
import { PaymentStatus } from "../../types/paymentTypes";

const initialState: PaymentState = {
  loading: false,
  status: PaymentStatus.NotStarted,
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
      })
      .addCase(payWithCard.fulfilled, (state: PaymentState) => {
        state.loading = false;
        state.status = PaymentStatus.Awaiting;
      })
      .addCase(payWithCard.rejected, (state: PaymentState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePaymentStatus.pending, (state: PaymentState) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatus.fulfilled, (state: PaymentState) => {
        state.loading = false;
        state.status = PaymentStatus.Succeeded;
      })
      .addCase(updatePaymentStatus.rejected, (state: PaymentState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;