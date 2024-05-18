import { createAsyncThunk } from "@reduxjs/toolkit";
import { CardElement } from "@stripe/react-stripe-js";
import { submitPayment } from "../../api/paymentService";
import { isApiError } from "../../utils/responseUtils";
import { PayWithCardPayload } from "../../types/stripeTypes";

export const payWithCard = createAsyncThunk<
void, 
PayWithCardPayload, 
{ rejectValue: string }
>(
  'payment/payWithCard',
  async (payload: PayWithCardPayload, { rejectWithValue }) => {
    try {
        const { amount, stripe, elements } = payload;

        if (!stripe || !elements) {
            return rejectWithValue("Stripe has not loaded yet.");
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            return rejectWithValue("CardElement not found.");
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
            //return rejectWithValue(error.message);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            console.log('Success');

            const response = await submitPayment(paymentMethod.id, amount);
            // if (isApiError(response)) {
            //     const apiError = response.error;
            //     return rejectWithValue(`Error code: ${apiError.code} Error description: ${apiError.description}`);
            // } else if (isApiSuccessEmpty(response)) {
            //     //return true;
            // } else {
            //     //return undefined;
            // }
        }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);