import { ReducerStates } from "../types/sharedTypes";

export interface PaymentState {
    loading: boolean,
    status: ReducerStates, 
    error: string | undefined,
}

