import React from 'react';
import { Field, useFormikContext } from 'formik';
import { NumericFieldProps } from '../types/fieldTypes';

const NumericField: React.FC<NumericFieldProps> = ({ name, label, formatValue }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatValue ? formatValue(value) : value;
    setFieldValue(name, formattedValue);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type="text" onChange={handleChange} />
    </div>
  );
};


export default NumericField;