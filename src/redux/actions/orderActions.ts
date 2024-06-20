import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { isApiError } from "../../utils/responseUtils";
import { ShippingDetails, OrderResponse } from "../../types/orderTypes";
import { saveOrder } from "../../api/orderService";
import { ApiResponse } from "../../types/okApiResponse";

export const makeOrder = createAsyncThunk<
    OrderResponse,
    ShippingDetails,
    { rejectValue: string }
>(
    'order/makeOrder',
    async (shippingDetails: ShippingDetails, { rejectWithValue }) => {
        try {
            const response: ApiResponse<OrderResponse> = await saveOrder(shippingDetails);

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

export const resetOrder = createAction('order/reset');

