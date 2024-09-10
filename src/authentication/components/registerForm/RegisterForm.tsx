import { ErrorMessage, Form, Formik } from "formik";
import styles from './RegisterForm.module.scss';
import { useSelector } from "react-redux";
import React from 'react';
import { RootState } from "../../../shared/redux/store";
import TextField from "../../../shared/components/TextField";
import { ApiError, FormType } from "../../../shared/sharedTypes";
import { registerSchema } from "../../../shared/validation/formsValidation/validationSchemas";
import { formatLoginAndSetLength, formatEmailInput, formatPasswordInput } from "../../../shared/validation/formsValidation/validationUtils";
import { registerCredentialsInitialValues } from "../../authConstants";
import { RegisterFormProps } from "../../authProps";
import FormValidationEffect from "../../../shared/utils/FormValidationEffect";

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
                        <FormValidationEffect setIsFormValid={setIsFormValid} apiError={apiError} formType={FormType.RegisterForm} />

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

