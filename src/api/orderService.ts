import axios from "axios";
import { OrderResponse, MakeOrderPayload } from "../types/orderTypes";
import { isOrderResponse, isProblemDetails } from "../utils/responseUtils";
import { OkApiResponse } from "../types/okApiResponse";
import { ApiError } from "../types/errorTypes";

axios.defaults.withCredentials = true;

export const saveOrder = async (payload: MakeOrderPayload): Promise<OkApiResponse<OrderResponse> | ApiError> => {
    try {
        const url: string = payload.orderMethod
            ? `https://localhost:5004/api/Orders/${payload.orderMethod}`
            : `https://localhost:5004/api/Orders`;

        const response: OrderResponse | any =
            await axios.post<OrderResponse>(url, payload.shippingDetails);

        if (isOrderResponse(response.data)) {
            const responseDetails: OkApiResponse<OrderResponse> = { isSuccess: true, entity: response.data };
            return responseDetails;
        }

        throw new Error("Unexpected Http status code received from API during saving order");
    } catch (error: any) {
        const data = error.response?.data;

        if (isProblemDetails(data)) {
            console.log("make order isProblemDetails");

            const apiError: ApiError = { isSuccess: false, error: data };
            return apiError;
        }

        throw new Error(`Failed to save order because of unexpected error, with message: ${error.message}`);
    };
};