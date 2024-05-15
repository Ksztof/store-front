import { ErrorMessage, Form, Formik } from "formik";
import { orderDetailsInitialValues, orderDetailsSchema } from "../validation/validationSchemas";
import TextField from "./TextFieldProps";
import NumericField from "./NumericField";
import { capitalizeFirstLetterAndSetLength, formatEmailInput, formatNumericField, formatPhoneNumber, formatPostCode } from "../validation/validationUtils";

export const OrderDetails: React.FC = () => {

    <TextField name="email" type="email" formatValue={formatEmailInput} label="Email" />
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

                        <TextField name="firstName" type="text" formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 52)} label="First Name" />
                        <ErrorMessage name="firstName" component="div" />

                        <TextField name="lastName" type="text" formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 52)} label="Last Name" />
                        <ErrorMessage name="lastName" component="div" />

                        <TextField name="email" type="email" formatValue={formatEmailInput} label="Email" />
                        <ErrorMessage name="email" component="div" />

                        <TextField name="street" type="text" formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 66)} label="Street" />
                        <ErrorMessage name="street" component="div" />

                        <NumericField name="streetNumber" formatValue={formatNumericField} label="Street Number" />
                        <ErrorMessage name="streetNumber" component="div" />

                        <NumericField name="homeNumber" formatValue={formatNumericField} label="Home Number" />
                        <ErrorMessage name="homeNumber" component="div" />

                        <TextField name="postCode" type="text" formatValue={formatPostCode} label="Post Code" />
                        <ErrorMessage name="postCode" component="div" />

                        <TextField name="city" type="text" formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 50)} label="City" />
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