import { LoginCredentials, RegisterCredentials } from "../types/authTypes";

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