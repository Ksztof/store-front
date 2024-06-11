import { ShippingDetails } from "../types/orderTypes";

export interface StripeCheckoutProps{
    amount: number;
    orderDetails: ShippingDetails;
}