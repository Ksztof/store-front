import { ErrorMessage, Form, Formik } from "formik";
import { shippingDetailsSchema } from "../validation/validationSchemas";
import TextField from "./TextField";
import NumericField from "./NumericField";
import { capitalizeFirstLetterAndSetLength, formatEmailInput, formatNumericField, formatPhoneNumber, formatPostCode } from "../validation/validationUtils";
import { ShippingDetailsProps } from "../props/orderProps";
import { shippingDetailsInitialValues } from "../initialValues/orderInitials";


export const ShippingDetailsForm: React.FC<ShippingDetailsProps> =
    ({ handleSetShippingDetails, setIsFormValid }) => {

        return (
            <div>
                <Formik
                    initialValues={shippingDetailsInitialValues}
                    validationSchema={shippingDetailsSchema}
                    onSubmit={() => {
                    }}
                >
                    {({ touched, isValid }) => {
                        const isFormFullyTouched: boolean = Object.keys(touched).length === Object.keys(shippingDetailsInitialValues).length;
                        const isFormValid: boolean = isValid && isFormFullyTouched;

                        if (isFormValid) {
                            setIsFormValid(true);
                        }

                        return (
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

                                <TextField
                                    name="firstName"
                                    type="text"
                                    formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 52)}
                                    label="First Name"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="firstName" component="div" />

                                <TextField
                                    name="lastName"
                                    type="text"
                                    formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 52)}
                                    label="Last Name"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="lastName" component="div" />

                                <TextField
                                    name="email"
                                    type="email" formatValue={formatEmailInput}
                                    label="Email"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="email" component="div" />

                                <TextField
                                    name="street"
                                    type="text"
                                    formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 66)}
                                    label="Street"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="street" component="div" />

                                <NumericField
                                    name="streetNumber"
                                    formatValue={formatNumericField}
                                    label="Street Number"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="streetNumber" component="div" />

                                <NumericField
                                    name="homeNumber"
                                    formatValue={formatNumericField}
                                    label="Home Number"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="homeNumber" component="div" />

                                <TextField
                                    name="postCode"
                                    type="text" formatValue={formatPostCode}
                                    label="Post Code"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="postCode" component="div" />

                                <TextField
                                    name="city"
                                    type="text"
                                    formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 50)}
                                    label="City"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="city" component="div" />

                                <TextField
                                    name="phoneNumber"
                                    type="text"
                                    formatValue={formatPhoneNumber}
                                    label="Phone Number"
                                    onBlur={() => { }}
                                    handleSetShippingDetails={handleSetShippingDetails} />
                                <ErrorMessage name="phoneNumber" component="div" />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        );
    }