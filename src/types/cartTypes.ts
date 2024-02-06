export interface CheckCart {
    productName: string;
    productUnitPrice: number;
    productTotalPrice: number;
    quantity: number;
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