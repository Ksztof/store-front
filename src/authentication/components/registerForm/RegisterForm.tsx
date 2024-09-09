import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import styles from './RegisterForm.module.scss';
import { useSelector } from "react-redux";
import React from 'react';
import { AppDispatch, RootState } from "../../../shared/redux/store";
import TextField from "../../../shared/components/TextField";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { clearError } from "../../../shared/redux/reducers/errorReducer";
import { ApiError } from "../../../shared/sharedTypes";
import { toCamelCase } from "../../../shared/sharedUtils";
import { registerSchema } from "../../../shared/validation/formsValidation/validationSchemas";
import { formatLoginAndSetLength, formatEmailInput, formatPasswordInput } from "../../../shared/validation/formsValidation/validationUtils";
import { isApiError } from "../../../shared/validation/typeGuards/typeGuardsUtils";
import { registerCredentialsInitialValues } from "../../authConstants";
import { RegisterFormProps } from "../../authProps";


const FormValidationEffect = ({ setIsFormValid, apiError }: { setIsFormValid: (isValid: boolean) => void, apiError: ApiError | string | null }) => {
    const formik = useFormikContext<any>();
    const [isErrorFromApi, setIsErrorFromApi] = useState<boolean>(false);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        const checkFormValidity = () => {
            if (formik) {
                const isFormTouched = Object.keys(formik.touched).length > 0;
                const formIsValid = formik.isValid && isFormTouched;
                setIsFormValid(formIsValid);
            }
        };

        checkFormValidity();
    }, [setIsFormValid, formik]);

    useEffect(() => {
        if (formik && apiError && isApiError(apiError)) {
            const apiErrors: { [key: string]: string } = {};
            const formFields = Object.keys(formik.initialValues);

            apiError.error.errors.forEach(error => {
                const errorCode: string = error.code;
                const propertyName: string = toCamelCase(errorCode.split('.')[0]);

                if (formFields.includes(propertyName)) {
                    apiErrors[propertyName] = (apiErrors[propertyName] ? `${apiErrors[propertyName]}, ` : '') + error.description;
                    setIsErrorFromApi(true);
                } else if (propertyName === "userValidation") {
                    apiErrors["confirmPassword"] = (apiErrors["confirmPassword"] ? `${apiErrors["confirmPassword"]}, ` : '') + error.description;
                    setIsErrorFromApi(true);
                }
            });

            formik.setErrors(apiErrors);
        }
    }, [apiError, formik]);

    useEffect(() => {
        if (isErrorFromApi) {
            formik.setErrors({});
            setIsFormValid(false);


            formik.validateForm().then((errors) => {
                setIsFormValid(Object.keys(errors).length === 0);
            });

            dispatch(clearError());

        }
    }, [formik.values])

    return null;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ handleSetRegisterCredentials, setIsFormValid }) => {
    const apiError: ApiError | string | null = useSelector((state: RootState) => state.error.error);

    return (
        <div className={styles.registerFormContainer}>
            <Formik
                initialValues={registerCredentialsInitialValues}
                validationSchema={registerSchema}
                onSubmit={() => { }}
            >
                {() => (
                    <Form>
                        <FormValidationEffect setIsFormValid={setIsFormValid} apiError={apiError} />

                        <TextField
                            name="login"
                            type="text"
                            formatValue={(value: string) => formatLoginAndSetLength(value, 15)}
                            label="Login"
                            onBlur={() => { }}
                            handleSetRegisterCredentials={handleSetRegisterCredentials}
                        />
                        <ErrorMessage className={styles.errorMsg} name="login" component="div" />

                        <TextField
                            name="email"
                            type="email"
                            formatValue={formatEmailInput}
                            label="Email"
                            onBlur={() => { }}
                            handleSetRegisterCredentials={handleSetRegisterCredentials}
                        />
                        <ErrorMessage className={styles.errorMsg} name="email" component="div" />

                        <TextField
                            name="password"
                            type="password"
                            formatValue={formatPasswordInput}
                            label="Password"
                            onBlur={() => { }}
                            handleSetRegisterCredentials={handleSetRegisterCredentials}
                        />
                        <ErrorMessage className={styles.errorMsg} name="password" component="div" />

                        <TextField
                            name="confirmPassword"
                            type="password"
                            formatValue={formatPasswordInput}
                            label="Confirm Password"
                            onBlur={() => { }}
                            handleSetRegisterCredentials={handleSetRegisterCredentials}
                        />
                        <ErrorMessage className={styles.errorMsg} name="confirmPassword" component="div" />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

