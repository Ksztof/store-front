export interface SuccessResponse<T> {
    isSuccess: true;
    entity: T;
}

export type ApiResponse<T> = SuccessResponse<T>;
