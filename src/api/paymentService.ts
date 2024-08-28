import axios, { HttpStatusCode } from "axios";
import { NoContentApiResponse } from "../types/noContentApiResponse";
import { ConfirmPaymentPayload, PaymentDetails } from "../types/paymentTypes";
import { isProblemDetails } from "../utils/responseUtils";
import { ApiError } from "../types/errorTypes";


axios.defaults.withCredentials = true;


export const getClientSecretApi = async (payload: PaymentDetails): Promise<string | ApiError> => {
    try {
        const response: string | any =
            await axios.post<string>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Payments', payload);

        if (typeof response.data === 'string' && response.data.trim() !== '') {
            const responseDetails: string = response.data;
            return responseDetails;
        }

        throw new Error("Unexpected status code received from API during getting client secret");
    } catch (error: any) {
        const data = error.response?.data;
        if (isProblemDetails(data)) {
            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        console.error(`Failed to get client secret because of unexpected error ${error.message}`);
        throw new Error(`Failed to get client secret because of unexpected error: ${error.message}`);
    };
};

export const updatePaymentIntentApi = async (clientSecret: string): Promise<NoContentApiResponse | ApiError> => {
    try {
        const response: void | any =
            await axios.post<void>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Payments/update-payment-intent', { clientSecret });

        if (response.status === HttpStatusCode.NoContent) {
            const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
            return responseDetails;
        }

        throw new Error("Unexpected response format received from API when updating payment intent");
    } catch (error: any) {
        const data = error.response?.data;

        if (isProblemDetails(data)) {
            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        console.error(`Failed to update payment intent because of unexpected error: ${error.message}`);
        throw new Error(`Failed to update payment intent because of unexpected error: ${error.message}`);
    };
};

export const confirmPaymentApi = async (payload: ConfirmPaymentPayload): Promise<NoContentApiResponse | ApiError> => {
    try {
        const response: void | any =
            await axios.post<void>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Payments/confirm-payment', payload);

        if (response.status === HttpStatusCode.NoContent) {
            const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
            return responseDetails;
        }

        throw new Error("Unexpected response format received from API during payment confirmation");
    } catch (error: any) {
        const data = error.response?.data;

        if (isProblemDetails(data)) {
            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        throw new Error(`Failed to confirm payment, because of unexpected error with message: ${error.message}`);
    };
};

