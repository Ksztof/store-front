import { ApiError } from "../shared/sharedTypes";
import { LoginCredentials, RegisterCredentials } from "./authTypes";

export const registerCredentialsInitialValues: RegisterCredentials = {
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
};

export const loginCredentialsInitialValues: LoginCredentials = {
    email: '',
    password: '',
};

export const apiErrorInitialValue: ApiError = {
    isSuccess: false,
    error: {
        type: "",
        title: "",
        status: 0,
        errors: []
    }
};