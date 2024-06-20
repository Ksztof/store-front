import axios from "axios";
import { ShippingDetails, OrderResponse } from "../types/orderTypes";
import { isOrderResponse, isProblemDetails } from "../utils/responseUtils";
import { ApiResponse } from "../types/apiResponse";
import { ApiError } from "../types/errorTypes";

axios.defaults.withCredentials = true;

export const saveOrder = async (orderDetails: ShippingDetails): Promise<ApiResponse<OrderResponse> | ApiError> => {
    try {
        const response = await axios.post<OrderResponse>('https://localhost:5004/api/Orders', orderDetails);

        if (isOrderResponse(response.data)) {
            const responseDetails: ApiResponse<OrderResponse> = { isSuccess: true, entity: response.data };
            return responseDetails;
        }

        throw new Error();
    } catch (error: any) {
        const data = error.response?.data;

        if (isProblemDetails(data)) {
            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        throw new Error("Failed to save order because of unexpected error");
    };
};