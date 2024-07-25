import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { isApiError } from "../../utils/responseUtils";
import { OrderResponse, MakeOrderPayload } from "../../types/orderTypes";
import { OkApiResponse } from "../../types/okApiResponse";
import { ApiError } from "../../types/errorTypes";
import { saveOrder } from "../../api/orderService";

export const makeOrder = createAsyncThunk<
    OrderResponse,
    MakeOrderPayload,
    { rejectValue: ApiError | string }
>(
    'order/makeOrder',
    async (makeOrderPayload: MakeOrderPayload, { rejectWithValue }) => {
        try {
            const response: OkApiResponse<OrderResponse> | ApiError = await saveOrder(makeOrderPayload);

            if (isApiError(response)) {
                console.log("make order has been rejected");
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

