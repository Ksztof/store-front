import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import TextField from "./TextField";
import { registerCredentialsInitialValues } from "../initialValues/authInitials";
import { registerSchema } from "../validation/validationSchemas";
import { formatEmailInput, formatLoginAndSetLength, formatPasswordInput } from "../validation/validationUtils";
import { RegisterFormProps } from "../props/authProps";
import { useEffect, useRef } from "react";

export const RegisterForm: React.FC<RegisterFormProps> =
    ({ handleSetRegisterCredentials, setIsFormValid }) => {
        const formikRef = useRef<FormikProps<any>>(null);

        useEffect(() => {
            const checkFormValidity = () => {
                const formik = formikRef.current;
                if (formik) {
                    const isFormFullyTouched = Object.keys(formik.touched).length === Object.keys(registerCredentialsInitialValues).length;
                    const formIsValid = formik.isValid && isFormFullyTouched;
                    setIsFormValid(formIsValid);
                }
            };

            checkFormValidity();
        });

        return (
            <div>
                <Formik
                    innerRef={formikRef}
                    initialValues={registerCredentialsInitialValues}
                    validationSchema={registerSchema}
                    onSubmit={() => { }}
                >
                    {() => (
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
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage name="login" component="div" />

                            <TextField
                                name="email"
                                type="email" formatValue={formatEmailInput}
                                label="Email"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage name="email" component="div" />

                            <TextField
                                name="password"
                                type="password" formatValue={formatPasswordInput}
                                label="Password"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage name="password" component="div" />

                            <TextField
                                name="confirmPassword"
                                type="password" formatValue={formatPasswordInput}
                                label="Confirm Password"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage name="confirmPassword" component="div" />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };