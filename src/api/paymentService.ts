import axios from "axios";
import { NoContentApiResponse } from "../types/noContentApiResponse";
import { PaymentDetails, PaymentIntentObject } from "../types/paymentTypes";
import { isPaymentIntent, isProblemDetails } from "../utils/responseUtils";
import { ApiError } from "../types/errorTypes";
import { OkApiResponse } from "../types/okApiResponse";

axios.defaults.withCredentials = true;


export const startOrder = async (paymentDetails: PaymentDetails): Promise<OkApiResponse<PaymentIntentObject> | ApiError> => {
    try {
        const response = await axios.post<PaymentIntentObject>('https://localhost:5004/api/Payments', paymentDetails);

        if (isPaymentIntent(response.data)) {
            const responseDetails: OkApiResponse<PaymentIntentObject> = { isSuccess: true, entity: response.data };
            return responseDetails;
        }
        throw new Error();
    } catch (error: any) {
        const data = error.response?.data;

        if (isProblemDetails(data)) {
            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        throw new Error("Failed to start order because of unexpected error");
    };
};

export const confirmPayment = async (intentPayload: PaymentIntentObject): Promise<NoContentApiResponse | ApiError> => {
    try {
        await axios.post('https://localhost:5004/api/Payments/confirm-payment', intentPayload);

        const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
        return responseDetails;
    } catch (error: any) {
        const data = error.response?.data;

        if (isProblemDetails(data)) {
            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        throw new Error("Failed to pay using card because of unexpected error");
    };
};

