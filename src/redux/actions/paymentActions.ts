import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayWithCardPayload } from "../../types/paymentTypes";
import { CardElement } from "@stripe/react-stripe-js";

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

            if (error?.message) {
                console.error(error);
                return rejectWithValue(error.message);
            } else {
                if(typeof paymentMethod !== "undefined"){
                    const response = await saveOrder(orderDetails);

                    if (isApiError(response)) {
                        const apiError = response.error;
                        return rejectWithValue(`Error code: ${apiError.code} Error description: ${apiError.description}`);
                    }
                } else {
                    rejectWithValue("Payment id is undefined");
                }
            }
        } catch (error: unknown) {
            console.error("Unexpected error:", error);
            return rejectWithValue("An unexpected error occurred");
        }
    }
);