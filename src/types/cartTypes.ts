
export interface CheckCart {
  productId: number
  productName: string;
  productUnitPrice: number;
  description: string;
  manufacturer: string;
  quantity: number;
  productTotalPrice: number;
};

export interface AboutCart {
  totalCartValue: number;
  aboutProductsInCart: CheckCart[];
  createdAt: string;
};

export interface CartState {
  loading: boolean;
  cartData: AboutCart;
  error: string | undefined;
};

export interface CartDetails {
  loading: boolean;
  aboutCart: AboutCart | null;
  error: string | undefined;
};

export interface CartSliceState {
  syncCartWithApi: CartState;
  cartDetails: CartDetails;
}

export interface AdjustProductQuantityPayload {
  productId: number,
  operationType: AdjustProductQuantityType
}
export enum AdjustProductQuantityType {
  Increase = "INCREASE",
  Decrease = "DECREASE"
}

export interface ChangeProductInCartQuantityPayload {
  productId: number,
  productQuantity: number 
}

export interface ProductInCartProps {
  product: CheckCart;
}

export interface ProductInCartApi {
  productId: number;
  quantity: number;
}

export interface NewProductsForApi {
  products: ProductInCartApi[];
}

export interface checkCurrentCartPayload{
  createdAt: string;
}
