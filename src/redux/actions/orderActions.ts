import { createAsyncThunk } from "@reduxjs/toolkit";
import { isApiError } from "../../utils/responseUtils";
import { OrderDetails, OrderResponse } from "../../types/orderTypes";
import { saveOrder } from "../../api/orderService";
import { ApiResponse } from "../../types/apiResponse";

export const makeOrder = createAsyncThunk<
    OrderResponse,
    OrderDetails,
    { rejectValue: string }
>(
    'order/makeOrder',
    async (orderDetails: OrderDetails, { rejectWithValue }) => {
        try {
            const response: ApiResponse<OrderResponse> = await saveOrder(orderDetails);

            if (isApiError(response)) {
                const apiError = response.error;
                return rejectWithValue(`Error code: ${apiError.code} Error description: ${apiError.description}`);
            }

            return response.entity;
        } catch (error: unknown) {
            console.error("Unexpected error:", error);
            return rejectWithValue("An unexpected error occurred");
        }
    }
);