import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError, OkApiResponse } from "../shared/sharedTypes";
import { isApiError } from "../shared/validation/typeGuards/typeGuardsUtils";
import { saveOrder } from "./orderService";
import { OrderResponse, MakeOrderPayload } from "./orderTypes";

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

