export interface CheckCart {
    productId: number
    productName: string;
    productUnitPrice: number;
    description: string;
    manufacturer: string;
    quantity: number;
    productTotalPrice: number;
  }
  
   export interface AboutCartApi  {
    totalCartValue: number;
    aboutProductsInCart: CheckCart[];
  }

  export interface AboutCart  {
    totalCartValue: number;
    aboutProductsInCart: CheckCart[];
  }

  export interface CartState {
    loading: boolean;
    cartData: any; 
    error: string | null;
  }