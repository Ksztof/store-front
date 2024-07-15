import { PaymentIntent } from "@stripe/stripe-js";
import { ShippingDetails } from "../types/orderTypes";

export interface StripeCheckoutProps{
    amount: number;
    orderDetails: ShippingDetails;
    isFormValid: boolean;
}

export interface WrappedStripeCheckoutProps{
    amount: number;
    orderDetails: ShippingDetails;
    isFormValid: boolean;
}



