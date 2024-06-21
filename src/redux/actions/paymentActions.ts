import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PayWithCardPayload, PaymentDetails } from "../../types/paymentTypes";
import { CardElement } from "@stripe/react-stripe-js";
import { payUsingCard } from "../../api/paymentService";
import { isApiError, isSignalrError } from "../../utils/responseUtils";
import { PaymentStatusResponse } from '../../types/paymentTypes';
import { AboutPayment } from '../../types/paymentTypes';
import { NoContentApiResponse } from "../../types/noContentApiResponse";
import { ApiError } from "../../types/errorTypes";

export const payWithCard = createAsyncThunk<
    void,
    PayWithCardPayload,
    { rejectValue: ApiError | string }
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
            }

            if (typeof paymentMethod !== "undefined") {
                //amount in grosz - stripe requirement
                amount = amount * 100;
                const paymentDetails: PaymentDetails = {
                    paymentMethodId: paymentMethod.id,
                    amount: amount,
                    currency: "PLN"
                }

                const response: NoContentApiResponse | ApiError = await payUsingCard(paymentDetails);

                if (isApiError(response)) {
                    return rejectWithValue(response);
                }

                return;
            }
        } catch (error: any) {
            console.error("payWithCard error: ", error);
            return rejectWithValue("An unexpected error occurred when paying by card");
        }
    }
);

export const updatePaymentStatus = createAsyncThunk<
    PaymentStatusResponse,
    AboutPayment,
    { rejectValue: string }
>(
    'payment/updatePaymentStatus',
    async (payload: AboutPayment, { rejectWithValue }) => {
        try {
            if (payload.status === PaymentStatusResponse.Succeeded) {
                return PaymentStatusResponse.Succeeded;
            }

            if (payload.error && isSignalrError(payload.error)) {
                return rejectWithValue(`Payment failed with code:  ${payload.error.code} and message ${payload.error.description} - applies to order with id: ${payload.orderId}`);
            }

            return rejectWithValue("payment status doesn't match");
        } catch {
            return rejectWithValue("An uncexpected error occured during payment status check.");
        }
    }
);

export const updatePaymentStatusSuccess = createAsyncThunk<
    PaymentStatusResponse,
    void,
    { rejectValue: string }
>(
    'payment/updatePaymentStatusSuccess',
    async (_, { rejectWithValue }) => {
        try {
            return PaymentStatusResponse.Succeeded;
        } catch {
            return rejectWithValue("An uncexpected error occured during changing payment status to success.");
        }
    }
);

export const resetPayment = createAction('payment/reset');
