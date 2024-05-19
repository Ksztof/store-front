import { OrderDetailsInitialValues } from "../types/orderTypes";

export interface StripeCheckoutProps{
    amount: number;
    orderDetails: OrderDetailsInitialValues;
}