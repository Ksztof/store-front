import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { clearError } from "../redux/reducers/errorReducer";
import { AppDispatch } from "../redux/store";
import { ApiError } from "../sharedTypes";
import { toCamelCase } from "./sharedUtils";
import { isApiError } from "../validation/typeGuards/typeGuardsUtils";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { FormType } from "../sharedTypes";

const FormValidationEffect = ({
    setIsFormValid,
    apiError,
    formType
}:
    {
        setIsFormValid: (isValid: boolean) => void,
        apiError: ApiError | string | null,
        formType: FormType
    }) => {

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

                    apiErrors[formType] = (apiErrors[formType] ? `${apiErrors[formType]}, ` : '') + error.description;
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

export default FormValidationEffect;
