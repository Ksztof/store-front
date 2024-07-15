import { PaymentIntent } from "@stripe/stripe-js";
import { ApiError } from "../types/errorTypes";
import { ReducerStates } from "../types/sharedTypes";

export interface PaymentState {
    loading: boolean,
    status: ReducerStates, 
    error: ApiError | string ,
    paymentIntent: PaymentIntent | null ,
}

