import { RegisterCredentials } from "../types/authTypes";

export interface RegisterFormProps {
    handleSetRegisterCredentials: (value: Partial<RegisterCredentials>) => void;
    setIsFormValid: (value: boolean) => void;
}