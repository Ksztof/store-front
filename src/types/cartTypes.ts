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
};

export interface CartState {
  loading: boolean;
  cartData: any;
  error: string | null;
};

export interface CartContent {
  loading: boolean;
  products: AboutCart | null;
  error: string | null;
};

export interface CombinedCartLocStorState {
  loading: boolean;
  combinedCartLocStorData: AboutCart | null;
  error: string | null;
};
