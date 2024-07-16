import { ShippingDetails } from "../types/orderTypes";

export interface StripeCheckoutProps{
    amount: number;
    orderDetails: ShippingDetails;
    isFormValid: boolean;
    clientSecret: string;
}

export interface WrappedStripeCheckoutProps{
    amount: number;
    orderDetails: ShippingDetails;
    isFormValid: boolean;
}



