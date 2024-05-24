import { PaymentStatus } from "../types/paymentTypes";

export interface PaymentState {
    loading: boolean,
    status: PaymentStatus, 
    error: string | undefined,
}

