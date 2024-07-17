import axios from "axios";
import { ShippingDetails, OrderResponse } from "../types/orderTypes";
import { isOrderResponse, isProblemDetails } from "../utils/responseUtils";
import { OkApiResponse } from "../types/okApiResponse";
import { ApiError } from "../types/errorTypes";

axios.defaults.withCredentials = true;

export const saveOrder = async (orderDetails: ShippingDetails): Promise<OkApiResponse<OrderResponse> | ApiError> => {
    try {
        const response: OrderResponse | any =
            await axios.post<OrderResponse>('https://localhost:5004/api/Orders', orderDetails);

        if (isOrderResponse(response.data)) {
            const responseDetails: OkApiResponse<OrderResponse> = { isSuccess: true, entity: response.data };
            return responseDetails;
        }

        throw new Error("Unexpected Http status code received from API during saving order");
    } catch (error: any) {
        const data = error.response?.data;

        if (isProblemDetails(data)) {
            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        throw new Error(`Failed to save order because of unexpected error, with message: ${error.message}`);
    };
};