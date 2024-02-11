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
    productsData: any; 
    error: string | null;
  }

  export interface ProductInCart {
    id: number;
    name: string;
    price: number;
    description: string;
    manufacturer: string; 
    dateAdded: Date;
    quantity: number;
    }