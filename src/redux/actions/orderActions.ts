import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { isApiError } from "../../utils/responseUtils";
import { ShippingDetails, OrderResponse } from "../../types/orderTypes";
import { saveOrder } from "../../api/orderService";
import { OkApiResponse } from "../../types/okApiResponse";
import { ApiError } from "../../types/errorTypes";

export const makeOrder = createAsyncThunk<
    OrderResponse,
    ShippingDetails,
    { rejectValue: ApiError | string }
>(
    'order/makeOrder',
    async (shippingDetails: ShippingDetails, { rejectWithValue }) => {
        try {
            const response: OkApiResponse<OrderResponse> | ApiError = await saveOrder(shippingDetails);

            if (isApiError(response)) {
                return rejectWithValue(response);
            }

            return response.entity;
        } catch (error: unknown) {
            console.error("makeOrder error: ", error);
            return rejectWithValue("An unexpected error occurred when creating an order");
        }
    }
);

export const resetOrder = createAction('order/reset');

