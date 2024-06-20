import axios from "axios";
import { ApiResponseNoContent } from "../types/apiResponseWithEmpty";
import { PaymentDetails } from "../types/paymentTypes";
import { isProblemDetails } from "../utils/responseUtils";
import { ApiError } from "../types/errorTypes";

axios.defaults.withCredentials = true;

export const payUsingCard = async (paymentDetails: PaymentDetails): Promise<ApiResponseNoContent | ApiError> => {
    try {
        await axios.post('https://localhost:5004/api/Payments', paymentDetails);
        const responseDetails: ApiResponseNoContent = { isSuccess: true, isEmpty: true };
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