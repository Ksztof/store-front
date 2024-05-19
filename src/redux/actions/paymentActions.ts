import { createAsyncThunk } from "@reduxjs/toolkit";
import { CardElement } from "@stripe/react-stripe-js";
import { saveOrder } from "../../api/orderService";
import { MakeOrderCardPaymentPayload } from "../../types/orderTypes";
import { isApiError } from "../../utils/responseUtils";

export const makeOrderCardPayment = createAsyncThunk<
void, 
MakeOrderCardPaymentPayload, 
{ rejectValue: string }
>(
  'order/makeOrderCardPayment',
  async (payload: MakeOrderCardPaymentPayload, { rejectWithValue }) => {
    try {
        const { amount, stripe, elements, orderDetails } = payload;

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

            const response = await saveOrder(orderDetails);
            if (isApiError(response)) {
                const apiError = response.error;
                return rejectWithValue(`Error code: ${apiError.code} Error description: ${apiError.description}`);
            } else {
                //return undefined;
            }
        }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);