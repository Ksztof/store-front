import { ReducerStates } from "../shared/sharedTypes";

export interface PaymentState {
    loading: boolean,
    status: ReducerStates, 
    clientSecret: string,
}

