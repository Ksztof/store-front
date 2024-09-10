import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError, OkApiResponse } from "../shared/sharedTypes";
import { isApiError } from "../shared/validation/typeGuards/typeGuardsUtils";
import { makeOrderApi } from "./orderService";
import { OrderResponse, MakeOrderPayload } from "./orderTypes";

export const makeOrder = createAsyncThunk<
    OrderResponse,
    MakeOrderPayload,
    { rejectValue: ApiError | string }
>(
    'order/makeOrder',
    async (makeOrderPayload: MakeOrderPayload, { rejectWithValue }) => {
        try {
            const response: OkApiResponse<OrderResponse> | ApiError = await makeOrderApi(makeOrderPayload);

            if (isApiError(response)) {
                return rejectWithValue(response);
            }

            return response.entity;
        } catch (error: unknown) {
            return rejectWithValue("An unexpected error occurred when creating an order");
        }
    }
);

export const resetOrder = createAction('order/reset');

