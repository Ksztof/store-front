import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayWithCardPayload, PaymentDetails } from "../../types/paymentTypes";
import { CardElement } from "@stripe/react-stripe-js";
import { payUsingCard } from "../../api/paymentService";
import { isApiError } from "../../utils/responseUtils";
import { PaymentStatusResponse } from '../../types/paymentTypes';
import { AboutPayment } from '../../types/paymentTypes';
import { isErrorContent } from '../../utils/responseUtils';

export const payWithCard = createAsyncThunk<
    null,
    PayWithCardPayload,
    { rejectValue: string }
>(
    'payment/payWithCard',
    async (payload: PayWithCardPayload, { rejectWithValue }) => {
        try {
            let { amount, stripe, elements } = payload;

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
                if (typeof paymentMethod !== "undefined") {
                    //amount in grosz - stripe requirement
                    amount = amount * 100;
                    const paymentDetails: PaymentDetails = {
                        paymentMethodId: paymentMethod.id,
                        amount: amount,
                        currency: "PLN"
                    }

                    const response = await payUsingCard(paymentDetails);

                    if (isApiError(response)) {
                        const apiError = response.error;
                        return rejectWithValue(`Error code: ${apiError.code} Error description: ${apiError.description}`);
                    }
                } else {
                    return rejectWithValue("The payment method wasn't created correctly");
                }

                return null;
            }
        } catch (error: unknown) {
            console.error("Unexpected error:", error);
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

export const updatePaymentStatus = createAsyncThunk<
    string,
    AboutPayment,
    { rejectValue: string }
>(
    'payment/updatePaymentStatus',
    async (payload: AboutPayment, { rejectWithValue }) => {
        console.log("updatePaymentStatus is executing");
        if (payload.status === PaymentStatusResponse.Succeeded) {
            return PaymentStatusResponse.Succeeded;
        } else if (payload.error && isErrorContent(payload.error)) {
            return rejectWithValue(`Payment failed with code:  ${payload.error.code} and message ${payload.error.description} - applies to order with id: ${payload.orderId}`);
        } else {
            return rejectWithValue("An uncexpected error occured during payment status check.");
        }
    }
);