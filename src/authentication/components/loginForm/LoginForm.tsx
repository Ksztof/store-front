import { ErrorMessage, Form, Formik } from "formik";
import { loginSchema } from "../../../shared/validation/formsValidation/validationSchemas";
import TextField from "../../../shared/components/TextField";
import { formatEmailInput, formatPasswordInput } from "../../../shared/validation/formsValidation/validationUtils";
import styles from './LoginForm.module.scss';
import { useSelector } from "react-redux";
import React from 'react';
import { RootState } from "../../../shared/redux/store";
import { ApiError, FormType } from "../../../shared/sharedTypes";
import { loginCredentialsInitialValues } from "../../authConstants";
import { LoginFormProps } from "../../authProps";
import FormValidationEffect from "../../../shared/utils/FormValidationEffect";

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
                        <FormValidationEffect setIsFormValid={setIsFormValid} apiError={apiError} formType={FormType.LoginForm} />

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
