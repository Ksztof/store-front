import { RegisterCredentials, LoginCredentials } from "../authentication/authTypes";
import { ShippingDetails } from "../order/orderTypes";

export enum ReducerStates {
    Idle = "IDLE",
    Pending = "PENDING",
    Fulfilled = "FULFILLED",
    Rejected = "REJECTED",
    LoggedOut = "LOGGEDOUT",
    Registered = "REGISTERED",
    LoggedIn = "LOGGEDIN",
    GuestSessionIdRemoved = "GUESTSESSIONIDREMOVED"
}

export enum Currency {
    PLN = "zł"
}

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

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleSetShippingDetails?: (value: Partial<ShippingDetails>) => void; 
    handleSetRegisterCredentials?: (value: Partial<RegisterCredentials>) => void; 
    handleSetLoginCredentials?: (value: Partial<LoginCredentials>) => void; 
}

export interface NumericFieldProps {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleSetShippingDetails?: (value: Partial<ShippingDetails>) => void; 
  }

  export interface NoContentApiResponseInterface {
    isSuccess: true;
    isEmpty: true;
}

export interface OkApiResponseInterface<T> {
    isSuccess: true;
    entity: T;
}

        
export type NoContentApiResponse = NoContentApiResponseInterface;
export type OkApiResponse<T> = OkApiResponseInterface<T>;
