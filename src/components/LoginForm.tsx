import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { LoginFormProps } from "../props/authProps";
import { loginCredentialsInitialValues } from "../initialValues/authInitials";
import { loginSchema } from "../validation/validationSchemas";
import TextField from "./TextField";
import { formatEmailInput, formatPasswordInput } from "../validation/validationUtils";

export const LoginForm: React.FC<LoginFormProps> =
    ({ handleSetLoginCredentials, setIsFormValid }) => {
        const formikRef = useRef<FormikProps<any>>(null);

        useEffect(() => {
            const checkFormValidity = () => {
                const formik = formikRef.current;
                if (formik) {
                    const isFormFullyTouched = Object.keys(formik.touched).length === Object.keys(loginCredentialsInitialValues).length;
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
                    initialValues={loginCredentialsInitialValues}
                    validationSchema={loginSchema}
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
                                name="email"
                                type="email" formatValue={formatEmailInput}
                                label="Email"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetLoginCredentials} />
                            <ErrorMessage name="email" component="div" />

                            <TextField
                                name="password"
                                type="password" formatValue={formatPasswordInput}
                                label="Password"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetLoginCredentials} />
                            <ErrorMessage name="password" component="div" />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };