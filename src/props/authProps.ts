import { LoginCredentials, RegisterCredentials } from "../types/authTypes";

export interface RegisterFormProps {
    handleSetRegisterCredentials: (value: Partial<RegisterCredentials>) => void;
    setIsFormValid: (value: boolean) => void;
}

export interface LoginFormProps {
    handleSetLoginCredentials: (value: Partial<LoginCredentials>) => void;
    setIsFormValid: (value: boolean) => void;
}