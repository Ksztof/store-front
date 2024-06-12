import React, { useEffect, useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { RegisterCredentials } from '../types/authTypes';
import { registerCredentialsInitialValues } from '../initialValues/authInitials';
import { register } from '../redux/actions/authActions';
import { useAppDispatch } from '../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ReducerStates } from '../types/sharedTypes';

export const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const registrationState: string = useSelector((state: RootState) => state.auth.status);

    const [registerCredentials, setRegisterCredentialsState] = useState<RegisterCredentials>(registerCredentialsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleSetRegisterCredentials = (values: Partial<RegisterCredentials>) => {
        setRegisterCredentialsState(prev => ({ ...prev, ...values }));
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsFormValid(true);
    };

    useEffect(() => {

    }, [registrationState])

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(register(registerCredentials));
        if (registrationState === ReducerStates.Fulfilled) {
            return (
                <div>
                    <><p>Registration complete!</p></>
                </div>
            );
        }
    };

    return (
        <div>
            <RegisterForm handleSetRegisterCredentials={handleSetRegisterCredentials} setIsFormValid={setIsFormValid} />
            {isFormValid && (
                <>
                    <button onClick={handleRegister}>Register</button>
                </>
            )}
        </div>
    );
};


export default RegisterPage;