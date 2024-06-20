import { z } from "zod";

export const ZodErrorContent = z.object({
    code: z.string(),
    description: z.string().optional(),
    type: z.number(),
});

export const ZodProblemDetails = z.object({
    type: z.string(),
    title: z.string(),
    status: z.number(),
    errors: z.array(ZodErrorContent),
});

export const ZodAboutProductsInCart = z.object({
    productId: z.number(),
    productName: z.string(),
    productUnitPrice: z.number(),
    productTotalPrice: z.number(),
    description: z.string(),
    manufacturer: z.string(),
    quantity: z.number(),
});

export const ZodAboutCart = z.object({
    totalCartValue: z.number(),
    aboutProductsInCart: z.array(ZodAboutProductsInCart),
    createdAt: z.string().refine(val => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date.toISOString() === val;
    }, {
        message: "Date format is not UTC format",
    }),
});

export const ZodCheckCart = z.object({
    productId: z.number(),
    productName: z.string(),
    productUnitPrice: z.number(),
    description: z.string(),
    manufacturer: z.string(),
    quantity: z.number(),
    productTotalPrice: z.number(),
});

export const ZodShippingDetailResponse = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    street: z.string(),
    streetNumber: z.string(),
    homeNumber: z.string(),
    postCode: z.string(),
    city: z.string(),
    phoneNumber: z.string(),
});

export const ZodOrderResponse = z.object({
    id: z.number(),
    totalCartValue: z.number(),
    aboutProductsInCart: z.array(ZodCheckCart),
    shippingDetil: ZodShippingDetailResponse,
});

export const ZodProductDetails = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    manufacturer: z.string(),
    dateAdded: z.string(),
});

export const ZodProductDetailsArray = z.array(ZodProductDetails);

export const ZodApiError = z.object({
    isSuccess: z.literal(false),
    error: ZodProblemDetails
});

export const ZodSuccessResponseNoContent = z.object({
    isSuccess: z.literal(true),
    isEmpty: z.literal(true),
});

export type ErrorContentZodType = z.infer<typeof ZodErrorContent>;
export type ProblemDetailsZodType = z.infer<typeof ZodProblemDetails>;
export type AboutCartZodType = z.infer<typeof ZodAboutCart>;
export type OrderResponseZodType = z.infer<typeof ZodOrderResponse>;
export type ProductDetailsArrayZodType = z.infer<typeof ZodProductDetailsArray>;
export type ApiErrorZodType = z.infer<typeof ZodApiError>;
export type ApiResponseNoContentZodType = z.infer<typeof ZodSuccessResponseNoContent>;
