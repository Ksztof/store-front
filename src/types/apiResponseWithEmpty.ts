export interface ApiSuccess<T> {
    isSuccess: true;
    entity: T;
}

export interface ApiSuccessEmpty{
    isSuccess: true;
    isEmpty: true;
}

export interface ErrorContent {
    code: string;
    description?: string;
}

export interface ApiError {
    isSuccess: false;
    error: ErrorContent;
}

export type ApiResponseWithEmpty<T> = ApiSuccess<T> | ApiError | ApiSuccessEmpty;





