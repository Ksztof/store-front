export interface OkApiResponseInterface<T> {
    isSuccess: true;
    entity: T;
}

export type OkApiResponse<T> = OkApiResponseInterface<T>;
