import { ApiError, ApiResponse, ApiSuccessEmpty, ErrorContent } from "../types/apiResponseTypes";
import { AboutCart } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";

export function isApiError<T>(response: ApiResponse<T>): response is ApiError {
  return 'isSuccess' in response && response.isSuccess === false;
}

export function isAboutCart(data: any): data is AboutCart {
  return 'totalCartValue' in data && 'aboutProductsInCart' in data && 'createdAt' in data;
}

export function isErrorContent(data: any): data is ErrorContent {
  return typeof data.code === 'string' && typeof data.description === 'string';
}

export function isApiSuccessEmpty(data: any): data is ApiSuccessEmpty {
  return data.isSuccess === true && data.isEmpty === true;
}
export function isProductDetails(data: any[]): data is ProductDetails[] {
  return data.every(item => 
    'id' in item &&
    'name' in item &&
    'price' in item &&
    'description' in item &&
    'manufacturer' in item &&
    'dateAdded' in item
  );
}
