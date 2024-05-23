import { OrderDetails, OrderResponse } from "../types/orderTypes";

export const orderDetailsInitialValues: OrderDetails = {
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
    error: string | undefined;
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