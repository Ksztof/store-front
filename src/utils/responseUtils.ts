import { SafeParseReturnType } from "zod";
import { AboutCartZodType, AboutPaymentZodType, ApiErrorZodType, ApiResponseNoContentZodType, OrderResponseZodType, PaymentIntentObjectZodType, PaymentIntentZodType, ProblemDetailsZodType, ProductDetailsArrayZodType, ZodAboutCart, ZodAboutPayment, ZodApiError, ZodOrderResponse, ZodPaymentIntent, ZodPaymentIntentObject, ZodProblemDetails, ZodProductDetailsArray, ZodSuccessResponseNoContent } from "../zod/schemas";


export function isApiError(response: any): response is ApiErrorZodType {
  const result: SafeParseReturnType<any, ApiErrorZodType> = ZodApiError.safeParse(response);
  return result.success;
}

export function isNoContentResponse(data: any): data is ApiResponseNoContentZodType {
  const result = ZodSuccessResponseNoContent.safeParse(data);
  return result.success;
}

export function isAboutCart(data: any): data is AboutCartZodType {
  const result: SafeParseReturnType<any, AboutCartZodType> = ZodAboutCart.safeParse(data);
  return result.success;
}

export function isProblemDetails(data: any): data is ProblemDetailsZodType {
  const result: SafeParseReturnType<any, ProblemDetailsZodType> = ZodProblemDetails.safeParse(data);
  return result.success;
}

export function isProductDetails(data: any): data is ProductDetailsArrayZodType {
  const result: SafeParseReturnType<any, ProductDetailsArrayZodType> = ZodProductDetailsArray.safeParse(data);
  return result.success;
}

export function isOrderResponse(data: any): data is OrderResponseZodType {
  const result: SafeParseReturnType<any, OrderResponseZodType> = ZodOrderResponse.safeParse(data);
  return result.success;
}

export function isSignalrError(data: any): data is AboutPaymentZodType {
  const result = ZodAboutPayment.safeParse(data);
  return result.success;
}

export function isPaymentIntent(data: any): data is PaymentIntentZodType {
  const result: SafeParseReturnType<any, PaymentIntentZodType> = ZodPaymentIntent.safeParse(data);
  return result.success;
}