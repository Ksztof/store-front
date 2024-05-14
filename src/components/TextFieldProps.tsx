import React from 'react';
import { Field, useFormikContext } from 'formik';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    formatValue?: (value: string) => string;
}

const TextField: React.FC<TextFieldProps> = ({ name, label, formatValue, ...props }) => {
    const { setFieldValue } = useFormikContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = formatValue ? formatValue(value) : value;
        console.log(`Setting value for ${name}:`, formattedValue); 

        setFieldValue(name, formattedValue);
    };

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} onChange={handleChange} {...props} />
        </div>
    );
};

export default TextField;
