export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  manufacturer: string;
  dateAdded: string;
}

export interface ProductState {
  loading: boolean;
  productsData: ProductDetails[];
}

export interface addProductToCartPayload {
  product: ProductDetails;
  quantity: number;
}

export interface ProductPayloadLocStor {
  product: ProductDetails;
  quantity: number;
}