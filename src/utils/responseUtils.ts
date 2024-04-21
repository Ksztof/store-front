import { ApiError, ApiResponse, ErrorContent } from "../types/apiResponseTypes";
import { AboutCart } from "../types/cartTypes";

export function isApiError<T>(response: ApiResponse<T>): response is ApiError {
  return 'isSuccess' in response && response.isSuccess === false;
}

export function isAboutCart(data: any): data is AboutCart {
  return 'totalCartValue' in data && 'aboutProductsInCart' in data;
}

export function isErrorContent(data: any): data is ErrorContent {
  return 'code' in data && 'description' in data;
}
