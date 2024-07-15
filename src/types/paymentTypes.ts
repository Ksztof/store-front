import { PaymentIntent, Stripe, StripeElements } from "@stripe/stripe-js";
import { ErrorContentSignalR} from "./errorTypes";

export interface StartOrderPayload {
  amount: number,
  stripe: Stripe | null,
  elements: StripeElements | null,
}

export interface PaymentDetails {
  paymentMethodId: string,
  amount: number,
  currency: string
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