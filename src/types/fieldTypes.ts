import { OrderDetailsInitialValues } from "./orderTypes";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleSetOrderDetails?: (value: Partial<OrderDetailsInitialValues>) => void; 
}

export interface NumericFieldProps {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleSetOrderDetails?: (value: Partial<OrderDetailsInitialValues>) => void; 
  }