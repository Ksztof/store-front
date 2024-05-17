import { Stripe, StripeElements } from "@stripe/stripe-js";

export interface Props {
    amount: number;
}

export interface PayWithCardPayload {
    amount: number;
    stripe: Stripe | null;
    elements: StripeElements | null;
}