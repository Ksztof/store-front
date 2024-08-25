import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";
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

const FormValidationEffect = ({ setIsFormValid, apiError }: { setIsFormValid: (isValid: boolean) => void, apiError: ApiError | string | null }) => {
    const formik = useFormikContext<any>();

    useEffect(() => {
        const checkFormValidity = () => {
            if (formik) {
                const isFormTouched = Object.keys(formik.touched).length > 0;
                const formIsValid = formik.isValid && isFormTouched;
                setIsFormValid(formIsValid);
            }
        };

        checkFormValidity();
    }, [formik.values, formik.errors, formik.touched, setIsFormValid, formik]);

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
                } else if (propertyName === "userValidation") {
                    apiErrors["password"] = (apiErrors["password"] ? `${apiErrors["password"]}, ` : '') + error.description;
                }
            });

            console.log(apiErrors);
            formik.setErrors(apiErrors);
        }
    }, [apiError, formik]);

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
