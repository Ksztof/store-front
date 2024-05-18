import { Stripe, StripeElements } from "@stripe/stripe-js";

export interface PayWithCardPayload {
    amount: number;
    stripe: Stripe | null;
    elements: StripeElements | null;
}