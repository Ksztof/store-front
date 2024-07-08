import React, { useState } from 'react';
import { RegisterForm } from '../../components/RegisterForm';
import { RegisterCredentials } from '../../types/authTypes';
import { registerCredentialsInitialValues } from '../../initialValues/authInitials';
import { register, resetAuth } from '../../redux/actions/authActions';
import { useAppDispatch } from '../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ReducerStates } from '../../types/sharedTypes';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.scss';

export const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const registrationState: string = useSelector((state: RootState) => state.auth.status);

    const [registerCredentials, setRegisterCredentialsState] = useState<RegisterCredentials>(registerCredentialsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleSetRegisterCredentials = (values: Partial<RegisterCredentials>) => {
        setRegisterCredentialsState(prev => ({ ...prev, ...values }));
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(register(registerCredentials));
    };

    return (
        <div className={styles.registerContainer}>
            {registrationState === ReducerStates.Fulfilled ? (
                <>
                    <p>Thank you for your registration!</p>
                    <p>Please check your email and click the activation link.</p>
                    <Link to="/" onClick={() => dispatch(resetAuth())}>OK</Link>
                </>
            ) : (
                <>
                    <RegisterForm handleSetRegisterCredentials={handleSetRegisterCredentials} setIsFormValid={setIsFormValid} />
                    Login: <Link className={styles.navbarLink} to="/login"> Login </Link>
                    {isFormValid && (
                        <>
                            <button onClick={handleRegister}>Register</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default RegisterPage;