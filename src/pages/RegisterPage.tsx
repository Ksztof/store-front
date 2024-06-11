import React, { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { RegisterCredentials } from '../types/authTypes';
import { registerCredentialsInitialValues } from '../initialValues/authInitials';

export const RegisterPage: React.FC = () => {
    const [registerCredentials, setRegisterCredentialsState] = useState<RegisterCredentials>(registerCredentialsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleSetRegisterCredentials = (values: Partial<RegisterCredentials>) => {
        setRegisterCredentialsState(prev => ({ ...prev, ...values }));
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsFormValid(true);
    };

    return (
        <div>
            <RegisterForm/>
        </div>
    );
};


export default RegisterPage;