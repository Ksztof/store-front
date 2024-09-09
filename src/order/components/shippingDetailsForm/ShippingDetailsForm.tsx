import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";
import { shippingDetailsSchema } from "../../../shared/validation/formsValidation/validationSchemas";
import TextField from "../../../shared/components/TextField";
import React from 'react';
import { capitalizeFirstLetterAndSetLength, formatEmailInput, formatPhoneNumber, formatPostCode } from "../../../shared/validation/formsValidation/validationUtils";
import { ShippingDetailsFormProps } from "../../orderProps";
import { shippingDetailsInitialValues } from "../../orderConstants";
import styles from './ShippingDetailsForm.module.scss';

const FormValidationEffect = ({ setIsFormValid }: { setIsFormValid: (isValid: boolean) => void }) => {
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

    return null;
};

export const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = ({ handleSetShippingDetails, setIsFormValid }) => {
    return (
        <div className={styles.shippDetContainer}>
            <Formik
                initialValues={shippingDetailsInitialValues}
                validationSchema={shippingDetailsSchema}
                onSubmit={() => { }}
            >
                {() => (
                    <Form>
                        <FormValidationEffect setIsFormValid={setIsFormValid} />

                        <TextField
                            name="firstName"
                            type="text"
                            formatValue={(value: string) => capitalizeFirstLetterAndSetLength(value, 52)}
                            label="First Name"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="firstName" component="div" />

                        <TextField
                            name="lastName"
                            type="text"
                            formatValue={(value: string) => capitalizeFirstLetterAndSetLength(value, 52)}
                            label="Last Name"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="lastName" component="div" />

                        <TextField
                            name="email"
                            type="email"
                            formatValue={formatEmailInput}
                            label="Email"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="email" component="div" />

                        <TextField
                            name="street"
                            type="text"
                            formatValue={(value: string) => capitalizeFirstLetterAndSetLength(value, 66)}
                            label="Street"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="street" component="div" />

                        <TextField
                            name="streetNumber"
                            label="Street Number"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="streetNumber" component="div" />

                        <TextField
                            name="homeNumber"
                            label="Home Number"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="homeNumber" component="div" />

                        <TextField
                            name="postCode"
                            type="text"
                            formatValue={formatPostCode}
                            label="Post Code"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="postCode" component="div" />

                        <TextField
                            name="city"
                            type="text"
                            formatValue={(value: string) => capitalizeFirstLetterAndSetLength(value, 50)}
                            label="City"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="city" component="div" />

                        <TextField
                            name="phoneNumber"
                            type="text"
                            formatValue={formatPhoneNumber}
                            label="Phone Number"
                            onBlur={() => { }}
                            handleSetShippingDetails={handleSetShippingDetails}
                        />
                        <ErrorMessage className={styles.errorMsg} name="phoneNumber" component="div" />
                    </Form>
                )}
            </Formik>
        </div>
    );
};
