import { Stripe, StripeElements } from "@stripe/stripe-js";

export interface PayWithCardPayload {
    amount: number;
    stripe: Stripe | null;
    elements: StripeElements | null;
}

export interface PaymentDetails {
    paymentMethodId: string,
    amount: number,
    currency: string
}