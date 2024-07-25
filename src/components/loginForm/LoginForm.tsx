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
import { toCamelCase } from "../../utils/localStorageUtils";

export const LoginForm: React.FC<LoginFormProps> =
    ({ handleSetLoginCredentials, setIsFormValid }) => {
        const apiError: ApiError | string = useSelector((state: RootState) => state.auth.error);

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

            if (formik && apiError && isApiError(apiError)) {
                const apiErrors: { [key: string]: string } = {};
                const formFields = Object.keys(formik.initialValues);
                
                apiError.error.errors
                    .forEach(error => {
                        const errorCode: string = error.code;
                        const propertyName: string = toCamelCase(errorCode.split('.')[0]);
                        console.log(`propertyName: ${propertyName}` )
                        if (formFields.includes(propertyName)) {
                            apiErrors[propertyName] = (apiErrors[propertyName] ? `${apiErrors[propertyName]}, ` : '') + error.description;
                        } else if (propertyName === "userValidation") {
                            apiErrors["password"] = (apiErrors["password"] ? `${apiErrors["password"]}, ` : '') + error.description;
                        }
                        else {
                            alert(error.description);
                        }
                    });
                console.log(apiErrors)
                formik.setErrors(apiErrors);
            }
        }, [apiError]);

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