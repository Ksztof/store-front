import axios from "axios";
import { OrderDetailsInitialValues, OrderResponse } from "../types/orderTypes";
import { isErrorContent, isOrderResponse } from "../utils/responseUtils";
import { ApiResponse } from "../types/apiResponseTypes";

axios.defaults.withCredentials = true;

export const saveOrder = async (orderDetails: OrderDetailsInitialValues): Promise<ApiResponse<OrderResponse>> => {
    try {
        const response = await axios.post<OrderResponse>('https://localhost:5445/api/Orders', orderDetails);

        const data = response.data;

        if (isErrorContent(data)) {
            return {
                isSuccess: false,
                error: data
            };

        } else if (isOrderResponse(data)) {
            return {
                isSuccess: true,
                entity: data
            };

        } else {
            throw new Error("Invalid API response format");
        }
    } catch (error) {
        throw new Error("Failed to retrive information about submitted order because of unexpected error");
    }
}