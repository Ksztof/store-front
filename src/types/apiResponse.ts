export interface ApiSuccess<T> {
    isSuccess: true;
    entity: T;
}

export interface ErrorContent {
    code: string;
    description?: string;
}

export interface ApiError {
    isSuccess: false;
    error: ErrorContent;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;