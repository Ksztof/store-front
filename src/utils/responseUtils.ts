import { ApiError, ApiResponse } from "../types/apiResponseTypes";

export function isApiError<T>(response: ApiResponse<T>): response is ApiError {
    return 'isSuccess' in response && response.isSuccess === false;
  }