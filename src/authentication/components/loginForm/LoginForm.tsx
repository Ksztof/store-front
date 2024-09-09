import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { loginSchema } from "../../../shared/validation/formsValidation/validationSchemas";
import TextField from "../../../shared/components/TextField";
import { formatEmailInput, formatPasswordInput } from "../../../shared/validation/formsValidation/validationUtils";
import styles from './LoginForm.module.scss';
import { isApiError } from "../../../shared/validation/typeGuards/typeGuardsUtils";
import { useSelector } from "react-redux";
import React from 'react';
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { clearError } from "../../../shared/redux/reducers/errorReducer";
import { AppDispatch, RootState } from "../../../shared/redux/store";
import { ApiError } from "../../../shared/sharedTypes";
import { toCamelCase } from "../../../shared/sharedUtils";
import { loginCredentialsInitialValues } from "../../authConstants";
import { LoginFormProps } from "../../authProps";


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
                console.log(`propertyName: ${propertyName}`);
                if (formFields.includes(propertyName)) {
                    apiErrors[propertyName] = (apiErrors[propertyName] ? `${apiErrors[propertyName]}, ` : '') + error.description;
                    setIsErrorFromApi(true);
                } else if (propertyName === "userValidation") {
                    apiErrors["password"] = (apiErrors["password"] ? `${apiErrors["password"]}, ` : '') + error.description;
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

export const LoginForm: React.FC<LoginFormProps> = ({ handleSetLoginCredentials, setIsFormValid }) => {
    const apiError: ApiError | string | null = useSelector((state: RootState) => state.error.error);

    return (
        <div className={styles.loginFormContainer}>
            <Formik
                initialValues={loginCredentialsInitialValues}
                validationSchema={loginSchema}
                onSubmit={() => { }}
            >
                {() => (
                    <Form>
                        <FormValidationEffect setIsFormValid={setIsFormValid} apiError={apiError} />

                        <TextField
                            name="email"
                            type="email"
                            formatValue={formatEmailInput}
                            label="Email"
                            onBlur={() => { }}
                            handleSetRegisterCredentials={handleSetLoginCredentials}
                        />
                        <ErrorMessage className={styles.errorMsg} name="email" component="div" />

                        <TextField
                            name="password"
                            type="password"
                            formatValue={formatPasswordInput}
                            label="Password"
                            onBlur={() => { }}
                            handleSetRegisterCredentials={handleSetLoginCredentials}
                        />
                        <ErrorMessage className={styles.errorMsg} name="password" component="div" />
                    </Form>
                )}
            </Formik>
        </div>
    );
};
