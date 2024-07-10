import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { registerCredentialsInitialValues } from "../../initialValues/authInitials";
import { RegisterFormProps } from "../../props/authProps";
import { registerSchema } from "../../validation/validationSchemas";
import TextField from "../TextField";
import { formatEmailInput, formatLoginAndSetLength, formatPasswordInput } from "../../validation/validationUtils";
import styles from './RegisterForm.module.scss';

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
            <div className={styles.registerFormContainer}>
                <Formik
                    innerRef={formikRef}
                    initialValues={registerCredentialsInitialValues}
                    validationSchema={registerSchema}
                    onSubmit={() => { }}
                >
                    {() => (
                        <Form>
                            <TextField
                                name="login"
                                type="text"
                                formatValue={(value) => formatLoginAndSetLength(value, 15)}
                                label="Login"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage className={styles.errorMsg} name="login" component="div" />

                            <TextField
                                name="email"
                                type="email" formatValue={formatEmailInput}
                                label="Email"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage className={styles.errorMsg} name="email" component="div" />

                            <TextField
                                name="password"
                                type="password" formatValue={formatPasswordInput}
                                label="Password"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage className={styles.errorMsg} name="password" component="div" />

                            <TextField
                                name="confirmPassword"
                                type="password" formatValue={formatPasswordInput}
                                label="Confirm Password"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetRegisterCredentials} />
                            <ErrorMessage className={styles.errorMsg} name="confirmPassword" component="div" />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };