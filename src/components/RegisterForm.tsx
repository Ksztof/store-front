import { ErrorMessage, Form, Formik } from "formik";
import TextField from "./TextField";
import { registerCredentialsInitialValues } from "../initialValues/authInitials";
import { registerSchema } from "../validation/validationSchemas";
import { formatEmailInput, formatLoginAndSetLength, formatPasswordInput } from "../validation/validationUtils";

export const RegisterForm: React.FC = () => {
    return (
        <div>
            <Formik
                initialValues={registerCredentialsInitialValues}
                validationSchema={registerSchema}
                onSubmit={() => {
                }}
            >
                {({ touched, isValid }) => {
                    const isFormFullyTouched: boolean = Object.keys(touched).length === Object.keys(registerCredentialsInitialValues).length;
                    const isFormValid: boolean = isValid && isFormFullyTouched;

                    // if (isFormValid) {
                    //     setIsFormValid(true);
                    // }

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
                                name="login"
                                type="text"
                                formatValue={(value) => formatLoginAndSetLength(value, 15)}
                                label="Login"
                                onBlur={() => { }} />
                            <ErrorMessage name="login" component="div" />

                            <TextField
                                name="email"
                                type="email" formatValue={formatEmailInput}
                                label="Email"
                                onBlur={() => { }}
                            />
                            <ErrorMessage name="email" component="div" />

                            <TextField
                                name="password"
                                type="password" formatValue={formatPasswordInput}
                                label="Password"
                                onBlur={() => { }}
                            />
                            <ErrorMessage name="password" component="div" />

                            <TextField
                                name="confirmPassword"
                                type="password" formatValue={formatPasswordInput}
                                label="Confirm Password"
                                onBlur={() => { }}
                            />
                            <ErrorMessage name="confirmPassword" component="div" />

                        </Form>
                    );
                }}
            </Formik>
        </div>

    );
}