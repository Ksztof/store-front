import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/loginForm/LoginForm';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { LoginCredentials } from '../../authTypes';
import styles from './LoginPage.module.scss';
import { resetCart } from '../../../cart/cartActions';
import { RootState } from '../../../shared/redux/store';
import { login } from '../../authActions';
import { loginCredentialsInitialValues } from '../../authConstants';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>(loginCredentialsInitialValues);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleSetLoginCredentials = (values: Partial<LoginCredentials>) => {
    setLoginCredentials(prev => ({ ...prev, ...values }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(resetCart());
      navigate('/');
    }
  }, [isLoggedIn, navigate, dispatch, isFormValid]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(loginCredentials))
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <LoginForm handleSetLoginCredentials={handleSetLoginCredentials} setIsFormValid={setIsFormValid} />
      </div>
      <div className={styles.registerLink}>
        New customer? Start here: <Link to="/register"> Register </Link>
      </div>
      <div className={`${styles.loginButton} ${isFormValid ? styles.formValid : ''}`}>
        <button onClick={handleLogin}>Login</button>
      </div >
    </div>
  );
};

export default LoginPage;
