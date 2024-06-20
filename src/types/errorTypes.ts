import { ProblemDetailsType } from "../zod/schemas";

export interface ApiError {
    isSuccess: false;
    error: ProblemDetailsType;
}