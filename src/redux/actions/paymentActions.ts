import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ConfirmPaymentPayload, PaymentConfirmationPayload, PaymentDetails, StartOrderPayload } from "../../types/paymentTypes";
import { CardElement } from "@stripe/react-stripe-js";
import { isApiError, isNoContentResponse, isSignalrError } from "../../utils/responseUtils";
import { PaymentStatusResponse } from '../../types/paymentTypes';
import { AboutPayment } from '../../types/paymentTypes';
import { ApiError } from "../../types/errorTypes";
import { confirmPaymentApi, getClientSecretApi, updatePaymentIntentApi } from "../../api/paymentService";
import { NoContentApiResponse } from "../../types/noContentApiResponse";

export const getClientSecret = createAsyncThunk<
    string,
    StartOrderPayload,
    { rejectValue: ApiError | string }
>(
    'payment/getClientSecret',
    async (payload: StartOrderPayload, { rejectWithValue }) => {
        try {
            let { amount } = payload;
            amount = amount * 100;

            const paymentDetails: PaymentDetails = {
                amount: amount,
                currency: "PLN",
            }

            const response: string | ApiError = await getClientSecretApi(paymentDetails);

            if (isApiError(response)) {
                return rejectWithValue(response);
            }

            if (typeof response === 'string' && response.trim() !== '') {
                return response;
            }

            return rejectWithValue("Cannot start order, client secret doesn't exist ");

        } catch (error: any) {
            console.error("payWithCard error: ", error);
            return rejectWithValue(`An unexpected error occurred when paying by card with message: ${error.message}`);
        }
    }
);

export const updatePaymentIntent = createAsyncThunk<
    void,
    string,
    { rejectValue: ApiError | string }
>(
    'payment/updatePaymentIntent',
    async (paymentIntentId: string, { rejectWithValue }) => {
        try {
            const response: NoContentApiResponse | ApiError = await updatePaymentIntentApi(paymentIntentId);

            if (isApiError(response)) {
                return rejectWithValue(response);
            }
            if (isNoContentResponse(response)) {
                return;
            }

        } catch (error: any) {
            console.error("payWithCard error: ", error);
            return rejectWithValue(`An unexpected error occurred when paying by card with message: ${error.message}`);
        }
    }
);

export const confirmPayment = createAsyncThunk<
    void,
    PaymentConfirmationPayload,
    { rejectValue: ApiError | string }
>(
    'payment/confirmPayment',
    async (payload: PaymentConfirmationPayload, { rejectWithValue }) => {
        try {
            let { clientSecret, stripe, elements } = payload;

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

            if (error && error.message) {
                console.error(error.message);
                return rejectWithValue(error.message);
            };

            if (paymentMethod && clientSecret) {
                const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });

                if (confirmError) {
                    console.error('Error confirming PaymentIntent:', confirmError);
                    return rejectWithValue("Error confirming PaymentIntent");
                };

                if (paymentIntent && paymentIntent.id) {
                    const payload: ConfirmPaymentPayload = {
                        PaymentIntentId: paymentIntent.id,
                        PaymentMethodId: paymentMethod.id,
                    };

                    const response: NoContentApiResponse | ApiError = await confirmPaymentApi(payload);

                    if (isApiError(response)) {
                        return rejectWithValue(response);
                    };

                    if (isNoContentResponse(response)) {
                        return;
                    };
                }
                return rejectWithValue("paymentIntent or PaymentIntentId is missing");
            }
            console.error(`paymentMethod: ${paymentMethod}`);
            console.error(`clientSecret: ${clientSecret}`);
            return rejectWithValue("paymentMethod or clientSecret is missing");

        } catch (error: any) {
            console.error("startPaymentConfirmation error: ", error);
            return rejectWithValue("An unexpected error occurred during payment confirmation ");
        };
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
