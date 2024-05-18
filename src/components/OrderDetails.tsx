import { ErrorMessage, Form, Formik } from "formik";
import { orderDetailsSchema } from "../validation/validationSchemas";
import TextField from "./TextField";
import NumericField from "./NumericField";
import { capitalizeFirstLetterAndSetLength, formatEmailInput, formatNumericField, formatPhoneNumber, formatPostCode } from "../validation/validationUtils";
import { orderDetailsInitialValues } from "../initialValues/orderInitials";
import { OrderDetailsProps } from "../props/orderDetailsProps";


export const OrderDetails: React.FC<OrderDetailsProps> = ({ setOrderDetails }) => {

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
                {({ errors, touched }) => {
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
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="firstName" component="div" />

                            <TextField
                                name="lastName"
                                type="text"
                                formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 52)}
                                label="Last Name"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="lastName" component="div" />

                            <TextField
                                name="email"
                                type="email" formatValue={formatEmailInput}
                                label="Email"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="email" component="div" />

                            <TextField
                                name="street"
                                type="text"
                                formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 66)}
                                label="Street"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="street" component="div" />

                            <NumericField
                                name="streetNumber"
                                formatValue={formatNumericField}
                                label="Street Number"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="streetNumber" component="div" />

                            <NumericField
                                name="homeNumber"
                                formatValue={formatNumericField}
                                label="Home Number"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="homeNumber" component="div" />

                            <TextField
                                name="postCode"
                                type="text" formatValue={formatPostCode}
                                label="Post Code"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="postCode" component="div" />

                            <TextField
                                name="city"
                                type="text"
                                formatValue={(value) => capitalizeFirstLetterAndSetLength(value, 50)}
                                label="City"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="city" component="div" />

                            <TextField
                                name="phoneNumber"
                                type="text"
                                formatValue={formatPhoneNumber}
                                label="Phone Number"
                                onBlur={(event) => (event)}//switch to onBlur={() =>{}}??????????????????
                                setOrderDetails={setOrderDetails} />
                            <ErrorMessage name="phoneNumber" component="div" />

                            <button type="submit">Submit</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}