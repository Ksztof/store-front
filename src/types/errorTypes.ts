export interface ErrorContent {
    code: string;
    description?: string;
    type: number;
};

export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    errors: ErrorContent[],
};

export interface ApiError {
    isSuccess: false;
    error: ProblemDetails;
};

export interface ErrorContentSignalR {
    code: string;
    description?: string;
};

export interface ErrorState {
    error: ApiError | string | null;
}