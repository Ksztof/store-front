import { ApiError } from "../types/errorTypes";
import { ShippingDetails, OrderResponse } from "../types/orderTypes";

export const shippingDetailsInitialValues: ShippingDetails = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    streetNumber: '',
    homeNumber: '',
    postCode: '',
    city: '',
    phoneNumber: ''
};

export interface OrderState {
    loading: boolean;
    orderData: OrderResponse;
    error: ApiError | string | undefined;
    status: string;
}

export const initialOrderData: OrderResponse = {
    id: 0,
    totalCartValue: 0,
    aboutProductsInCart: [],
    shippingDetil: {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      streetNumber: '',
      homeNumber: '',
      postCode: '',
      city: '',
      phoneNumber: ''
    }
  };