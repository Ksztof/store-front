import { Stripe, StripeElements } from "@stripe/stripe-js";
import {ErrorContent} from "./apiResponse"

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

export enum PaymentStatus {
    Succeeded = "SUCCEEDED",
    Failed = "FAILED",
    Awaiting = "AWAITING",
    NotStarted = "NOTSTARTED"
  }

  export interface AboutPayment {
    orderId: string;
    status: PaymentStatusResponse;
    error?: ErrorContent; 
  }

  export enum PaymentStatusResponse {
    Succeeded = "succeeded",
    Failed = "failed"
}