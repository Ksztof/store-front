import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentState } from "../../initialValues/paymentInitials";
import { payWithCard } from "../actions/paymentActions";

const initialState: PaymentState = {
    loading: false,
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
        })
        .addCase(payWithCard.rejected, (state: PaymentState, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
  });
  
  export default paymentSlice.reducer;