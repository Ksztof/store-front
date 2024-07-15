import { ApiError } from "./errorTypes";
import { ProductDetails } from "./productTypes";

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
  error: ApiError | string;
  isEmpty: boolean,
};

export interface CartDetails {
  loading: boolean;
  aboutCart: AboutCart;
  error: string;
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

export interface ModifyProductInCartQuantityPayload {
  productId: number,
  productQuantity: number,
  aboutCart: AboutCart,
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

export interface addProductToReduxStorePayload{
  cartContent: AboutCart;
  newProduct: ProductDetails;
  newProductQuantity: number;
}

export interface increaseProductInCartQuantityStorePayload{
  productId: number;
  cartContent: AboutCart;
}