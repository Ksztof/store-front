import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { ShippingDetails } from "../types/orderTypes";

export interface StripeCheckoutProps {
    amount: number;
    shippingDetails: ShippingDetails;
    isFormValid: boolean;
    clientSecret: string;
};

export interface WrappedStripeCheckoutProps {
    amount: number;
    shippingDetails: ShippingDetails;
    isFormValid: boolean;
};

export const paymentOptions: StripePaymentElementOptions = {
    fields: {
        billingDetails: {
            address: {
                country: 'never',
            },
        }
    },
    wallets: {
        applePay: 'never',
        googlePay: 'never'
    }
};
