import React from 'react';
import { Field, useFormikContext } from 'formik';

interface NumericFieldProps {
  name: string;
  label: string;
}

const NumericField: React.FC<NumericFieldProps> = ({ name, label }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, '');
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