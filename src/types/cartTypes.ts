interface CheckCart {
    ProductName: string;
    ProductUnitPrice: number;
    ProductTotalPrice: number;
    Quantity: number;
  }
  
   export interface AboutCart  {
    TotalCartValue: number;
    AboutProductsInCart: CheckCart[];
  }

  export interface CartState {
    loading: boolean;
    cartData: any; 
    error: string | null;
  }