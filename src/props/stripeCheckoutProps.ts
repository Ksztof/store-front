import { OrderDetails } from "../types/orderTypes";

export interface StripeCheckoutProps{
    amount: number;
    orderDetails: OrderDetails;
}