import React from 'react';
import { Field, useFormikContext } from 'formik';
import { TextFieldProps } from '../types/fieldTypes';

const TextField: React.FC<TextFieldProps> = ({ name, label, formatValue, onBlur, setOrderDetails }) => {
    const { setFieldValue, handleBlur } = useFormikContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = formatValue ? formatValue(value) : value;
        setFieldValue(name, formattedValue);
    };

    const handleCustomBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = formatValue ? formatValue(value) : value;


        handleBlur(e);

        if (setOrderDetails) {
            setOrderDetails({ [name]: formattedValue });
        }
    };

    const blurProps = onBlur ? { onBlur: handleCustomBlur } : {};

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name}
                id={name}
                type="text"
                onChange={handleChange}
                {...blurProps}
            />
        </div>
    );
};

export default TextField;
