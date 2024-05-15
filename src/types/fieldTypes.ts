export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
}

export interface NumericFieldProps {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
  }