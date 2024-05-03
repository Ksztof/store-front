export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  manufacturer: string;
  dateAdded: Date;
}

export interface ProductState {
  loading: boolean;
  productsData: ProductDetails[];
  error: string | undefined;
}
export interface ProductPayloadCart {
  product: ProductDetails;
  quantity: string;
}
export interface ProductPayloadLocStor {
  product: ProductDetails;
  quantity: number;
}