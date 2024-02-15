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
  error: string | null;
}

export interface ProductInCartDetails {
  id: number;
  name: string;
  price: number;
  quantity: number;
}