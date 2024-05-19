import React from 'react';
import { Field, useFormikContext } from 'formik';
import { NumericFieldProps } from '../types/fieldTypes';

const NumericField: React.FC<NumericFieldProps> = ({ name, label, formatValue, onBlur, handleSetOrderDetails }) => {
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

    if (handleSetOrderDetails) {
      handleSetOrderDetails({ [name]: formattedValue });
    }
  };
  
  const blurProps = onBlur ? { onBlur: handleCustomBlur } : {};

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        type="number"
        onChange={handleChange}
        {...blurProps}
      />
    </div>
  );
};


export default NumericField;