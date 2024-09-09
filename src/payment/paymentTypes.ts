import { PaymentIntent, Stripe, StripeElements } from "@stripe/stripe-js";
import { AppDispatch } from "../shared/redux/store";
import { ErrorContentSignalR } from "../shared/sharedTypes";

export interface StartOrderPayload {
  amount: number
}

export interface PaymentDetails {
  amount: number,
  currency: string
}

export interface PaymentConfirmationPayload {
  stripe: Stripe | null,
  elements: StripeElements | null
}

export interface PaymentIntentObject {
  paymentIntent: PaymentIntent,
}

export interface AboutPayment {
  orderId: string,
  status: PaymentStatusResponse,
  error?: ErrorContentSignalR,
}

export interface ConfirmPaymentPayload {
  PaymentIntentId: string,
  PaymentMethodId: string,
}

export interface AsyncTasksParams {
  amount: number;
  dispatch: AppDispatch;
  signal: AbortSignal;
}
export enum PaymentStatusResponse {
  Succeeded = "succeeded",
  Failed = "failed"
}