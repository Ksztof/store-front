import { SafeParseReturnType } from "zod";
import { ApiResponseNoContent } from "../types/apiResponseWithEmpty";
import { AboutCart } from "../types/cartTypes";
import { OrderResponse } from "../types/orderTypes";
import { ProductDetails } from "../types/productTypes";
import { ProblemDetailsType, ZodAboutCart, ZodOrderResponse, ZodProblemDetails } from "../zod/schemas";

// export function isApiError<T>(response: ApiResponseNoContent | ApiResponse<T>): response is ApiError {
//   const result: SafeParseReturnType<any, ApiError> = ZodApiError.safeParse(response);
//   return result.success;
// }

export function isAboutCart(data: any): data is AboutCart {
  const result: SafeParseReturnType<any, AboutCart> = ZodAboutCart.safeParse(data);
  return result.success;
}

export function isProblemDetails(data: any): data is ProblemDetailsType {
  const result: SafeParseReturnType<any, ProblemDetailsType> = ZodProblemDetails.safeParse( data );
  return result.success;
}

export function isApiSuccessEmpty(data: any): data is ApiResponseNoContent {
  return data.isSuccess === true && data.isEmpty === true;
}

export function isProductDetails(data: any[]): data is ProductDetails[] {
  return data.every(item =>
    'id' in item
    && 'name' in item
    && 'price' in item
    && 'description' in item
    && 'manufacturer' in item
    && 'dateAdded' in item
  );
}

export function isOrderResponse(data: any): data is OrderResponse {
  const result = ZodOrderResponse.safeParse(data);
  return result.success;
}