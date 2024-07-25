import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { registerCredentialsInitialValues } from "../../initialValues/authInitials";
import { RegisterFormProps } from "../../props/authProps";
import { registerSchema } from "../../validation/validationSchemas";
import TextField from "../TextField";
import { formatEmailInput, formatLoginAndSetLength, formatPasswordInput } from "../../validation/validationUtils";
import styles from './RegisterForm.module.scss';
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ApiError } from "../../types/errorTypes";
import { isApiError } from "../../utils/responseUtils";
import { toCamelCase } from "../../utils/localStorageUtils";

export const RegisterForm: React.FC<RegisterFormProps> =
    ({ handleSetRegisterCredentials, setIsFormValid }) => {
        const apiError: ApiError | string = useSelector((state: RootState) => state.auth.error);
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
                            apiErrors["confirmPassword"] = (apiErrors["confirmPassword"] ? `${apiErrors["confirmPassword"]}, ` : '') + error.description;
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