import React from 'react';
import { Field, useFormikContext } from 'formik';
import { TextFieldProps } from '../types/fieldTypes';

const TextField: React.FC<TextFieldProps> = ({ name, label, formatValue, ...props }) => {
    const { setFieldValue } = useFormikContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = formatValue ? formatValue(value) : value;
        setFieldValue(name, formattedValue);
    };

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name} type="text" onChange={handleChange} {...props} />
        </div>
    );
};

export default TextField;
