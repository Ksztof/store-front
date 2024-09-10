import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError, NoContentApiResponse } from "../shared/sharedTypes";
import { isApiError, isNoContentResponse, isSignalrError } from "../shared/validation/typeGuards/typeGuardsUtils";
import { getClientSecretApi, updatePaymentIntentApi, confirmPaymentApi } from "./paymentService";
import { PaymentStatusResponse, AboutPayment, ConfirmPaymentPayload, PaymentConfirmationPayload, PaymentDetails, StartOrderPayload } from "./paymentTypes";

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
    async (clientSecret: string, { rejectWithValue }) => {
        try {
            const response: NoContentApiResponse | ApiError = await updatePaymentIntentApi(clientSecret);

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
            let { stripe, elements } = payload;

            if (!stripe || !elements) {
                return rejectWithValue("Stripe has not loaded yet.");
            }

            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    payment_method_data: {
                        billing_details: {
                            address: {
                                country: 'PL'
                            }
                        }
                    }
                },
                redirect: 'if_required',
            });

            if (error && error.message) {
                console.error('Error confirming PaymentIntent:', error.message);
                return rejectWithValue(error.message);
            }

            if (paymentIntent && paymentIntent.id) {
                const payload: ConfirmPaymentPayload = {
                    PaymentIntentId: paymentIntent.id,
                    PaymentMethodId: paymentIntent.payment_method as string,
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
        catch (error: any) {
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
