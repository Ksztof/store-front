interface CheckCart {
    ProductName: string;
    ProductUnitPrice: number;
    ProductTotalPrice: number;
    Quantity: number;
  }
  
   interface AboutCart  {
    TotalCartValue: number;
    AboutProductsInCart: CheckCart[];
  }