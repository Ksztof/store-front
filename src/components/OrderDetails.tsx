import { ErrorMessage, Field, Form, Formik } from "formik";
import { orderDetailsInitialValues, orderDetailsSchema } from "../validation/validationSchemas";
import CustomField from "./NumericField";
import TextField from "./TextFieldProps";
import NumericField from "./NumericField";

export const OrderDetails: React.FC = () => {
    function capitalizeFirstLetter(string: string) {
    console.log("Input value:", string); // Sprawdź wejściową wartość
    const result = string.charAt(0).toUpperCase() + string.slice(1);
    console.log("Formatted value:", result); // Sprawdź sformatowaną wartość
    return result;
}


    function formatPostCode(value: string) {
        if (value.length === 2 && !value.includes('-')) {
            return `${value}-`;
        }
        return value;
    }

    function formatPhoneNumber(value: string) {
        const onlyNums = value.replace(/[^\d]/g, '');
        if (onlyNums.length <= 3) return onlyNums;
        if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 9)}`;
    }

    function formatNumericField(value: string) {
        return value.slice(0, 6).replace(/[^0-9]/g, '');
    }

    function formatCity(value: string) {
        if (value.length > 50) {
            value = value.slice(0, 50);
        }
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    function validateEmail(value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    return (
        <div>
            <Formik
                initialValues={orderDetailsInitialValues}
                validationSchema={orderDetailsSchema}
                onSubmit={(values) => {
                    console.log(values);
                    // Api call or something 
                }}
            >
                {({ errors, touched }) => (
                    <Form style={{ display: 'block' }}>
                        <style>
                            {`
                                form > div {
                                    margin-bottom: 10px;
                                }
                                label, input {
                                    display: block;
                                    width: 100%;
                                }
                            `}
                        </style>

                        <TextField name="firstName" type="text" formatValue={capitalizeFirstLetter} label="First Name" />
                        <ErrorMessage name="firstName" component="div" />

                        <TextField name="lastName" type="text" formatValue={capitalizeFirstLetter} label="Last Name" />
                        <ErrorMessage name="lastName" component="div" />

                        <TextField name="email" type="email" label="Email" />
                        <ErrorMessage name="email" component="div" />

                        <TextField name="street" type="text" formatValue={capitalizeFirstLetter} label="Street" />
                        <ErrorMessage name="street" component="div" />

                        <NumericField name="streetNumber" label="Street Number" />
                        <ErrorMessage name="streetNumber" component="div" />

                        <NumericField name="homeNumber" label="Home Number" />
                        <ErrorMessage name="homeNumber" component="div" />

                        <TextField name="postCode" type="text" formatValue={formatPostCode} label="Post Code" />
                        <ErrorMessage name="postCode" component="div" />

                        <TextField name="city" type="text" formatValue={capitalizeFirstLetter} label="City" />
                        <ErrorMessage name="city" component="div" />

                        <TextField name="phoneNumber" type="text" formatValue={formatPhoneNumber} label="Phone Number" />
                        <ErrorMessage name="phoneNumber" component="div" />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );


}