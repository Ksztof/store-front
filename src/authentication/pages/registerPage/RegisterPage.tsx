
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { RootState } from '../../../shared/redux/store';
import { ReducerStates } from '../../../shared/sharedTypes';
import { register, resetAuth } from '../../authActions';
import { registerCredentialsInitialValues } from '../../authConstants';
import { RegisterCredentials } from '../../authTypes';
import { RegisterForm } from '../../components/registerForm/RegisterForm';


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

    useEffect(() => {
    }, [registrationState])

    return (
        <>
            <div className={styles.registerContainer}>
                {registrationState === ReducerStates.Registered ? (
                    <div className={styles.summaryConatiner}>
                        <div className={styles.summaryContent}>
                            <h2>We're glad you joined us!</h2>
                            <p>Please check your email and click the activation link.</p>
                            <Link to="/" onClick={() => dispatch(resetAuth())}>Home</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles.registerForm}>
                            <RegisterForm handleSetRegisterCredentials={handleSetRegisterCredentials} setIsFormValid={setIsFormValid} />
                        </div>
                        <div className={styles.loginLink}>
                            Already have an account? Login here: <Link className={styles.navbarLink} to="/login">Login</Link>
                        </div>
                        <div className={`${styles.registerButton} ${isFormValid ? styles.formValid : ''}`}>
                            <button onClick={handleRegister}>Register</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}      