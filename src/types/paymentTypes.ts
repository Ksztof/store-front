import { PaymentIntent, Stripe, StripeElements } from "@stripe/stripe-js";
import { ErrorContentSignalR } from "./errorTypes";
import { AppDispatch } from "../redux/store";
import { ShippingDetails } from "./orderTypes";

export interface StartOrderPayload {
  amount: number
}

export interface PaymentDetails {
  amount: number,
  currency: string
}

export interface PaymentConfirmationPayload {
  clientSecret: string | null,
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

export enum PaymentStatusResponse {
  Succeeded = "succeeded",
  Failed = "failed"
}


export interface ConfirmPaymentPayload {
  PaymentIntentId: string,
  PaymentMethodId: string,
}

export interface AsyncTasksParams {
  orderState: string;
  amount: number;
  orderDetails: ShippingDetails;
  dispatch: AppDispatch;
  signal: AbortSignal;
}
