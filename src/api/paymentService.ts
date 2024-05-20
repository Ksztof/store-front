import axios from "axios";
import { ApiResponseWithEmpty } from "../types/apiResponseWithEmpty";

axios.defaults.withCredentials = true;

export const payUsingCard = async (orderDetails: OrderDetails): Promise<ApiResponseWithEmpty<OrderResponse>> => {
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