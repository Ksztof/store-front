import { Stripe, StripeElements } from "@stripe/stripe-js";
import { ProblemDetailsType } from "./okApiResponse";

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

export interface AboutPayment {
  orderId: string;
  status: PaymentStatusResponse;
  error?: ProblemDetailsType;
}

export enum PaymentStatusResponse {
  Succeeded = "succeeded",
  Failed = "failed"
}