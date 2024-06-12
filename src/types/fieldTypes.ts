import { RegisterCredentials } from "./authTypes";
import { ShippingDetails } from "./orderTypes";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleSetShippingDetails?: (value: Partial<ShippingDetails>) => void; 
    handleSetRegisterCredentials?: (value: Partial<RegisterCredentials>) => void; 
}

export interface NumericFieldProps {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleSetShippingDetails?: (value: Partial<ShippingDetails>) => void; 
  }