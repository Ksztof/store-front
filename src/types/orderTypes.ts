import { Stripe, StripeElements } from "@stripe/stripe-js";
import { CheckCart } from "./cartTypes";

export interface OrderDetails {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    streetNumber: string;
    homeNumber: string;
    postCode: string;
    city: string;
    phoneNumber: string;
};

export interface MakeOrderCardPaymentPayload {
    amount: number;
    stripe: Stripe | null;
    elements: StripeElements | null;
    orderDetails: OrderDetails;
}

interface ShippingDetailResponse {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    streetNumber: string;
    homeNumber: string;
    postCode: string;
    city: string;
    phoneNumber: string;
};

export interface OrderResponse {
    id: number;
    totalCartValue: number;
    aboutProductsInCart: CheckCart[];
    shippingDetil: ShippingDetailResponse;
}