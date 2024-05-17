import { createAsyncThunk } from "@reduxjs/toolkit";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { submitPayment } from "../../api/paymentService";
import { isApiError } from "../../utils/responseUtils";
import { PayWithCardPayload } from "../../types/stripeTypes";

export const payWithCard = createAsyncThunk<
boolean, 
PayWithCardPayload, 
{ rejectValue: string | undefined }
>(
  'payment/payWithCard',
  async (payload: PayWithCardPayload, { rejectWithValue }) => {
    try {
        const { amount, stripe, elements } = payload;

        if (!stripe || !elements) {
            return rejectWithValue("Stripe has not loaded yet.");
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
        });

        if (error) {
            console.error(error);
            return rejectWithValue(error.message);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            console.log('Success');

            const response: any = await submitPayment(paymentMethod.id, amount);
            if (isApiError(response)) {
                const error = response.error;
                return rejectWithValue(`Error code: ${error.code} Error description: ${error.description}`);
            } else if (isApiSuccessEmpty(response)) {
                return true;
            } else {
                return undefined;
            }
        }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);