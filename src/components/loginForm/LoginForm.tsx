import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { LoginFormProps } from "../../props/authProps";
import { loginCredentialsInitialValues } from "../../initialValues/authInitials";
import { loginSchema } from "../../validation/validationSchemas";
import TextField from "../TextField";
import { formatEmailInput, formatPasswordInput } from "../../validation/validationUtils";
import styles from './LoginForm.module.scss';
import { isApiError } from "../../utils/responseUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ApiError } from "../../types/errorTypes";

export const LoginForm: React.FC<LoginFormProps> =
    ({ handleSetLoginCredentials, setIsFormValid }) => {
        const validationError: ApiError | string | undefined = useSelector((state: RootState) => state.auth.error);

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

        
        useEffect(() => {
            const formik = formikRef.current;
            if (formik && validationError && isApiError(validationError)) {
                validationError.error.errors
                    .forEach(error => {
                        const errorCode: string = error.code;
                        const propertyName: string = errorCode.split('.')[0].toLowerCase();

                        formik.errors[propertyName] = (formik.errors[propertyName] ? `${formik.errors[propertyName]}, ` : '') + error.description
                    });
                formik.setErrors(formik.errors);
            }
        }, [validationError]);

        return (
            <div className={styles.loginFormContainer}>
                <Formik
                    innerRef={formikRef}
                    initialValues={loginCredentialsInitialValues}
                    validationSchema={loginSchema}
                    onSubmit={() => { }}
                >
                    {() => (
                        <Form>
                            <TextField
                                name="email"
                                type="email" formatValue={formatEmailInput}
                                label="Email"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetLoginCredentials} />
                            <ErrorMessage className={styles.errorMsg} name="email" component="div" />

                            <TextField
                                name="password"
                                type="password" formatValue={formatPasswordInput}
                                label="Password"
                                onBlur={() => { }}
                                handleSetRegisterCredentials={handleSetLoginCredentials} />
                            <ErrorMessage className={styles.errorMsg} name="password" component="div" />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };