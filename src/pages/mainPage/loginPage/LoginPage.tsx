import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../../../components/LoginForm';
import { useAppDispatch } from '../../../hooks';
import { loginCredentialsInitialValues } from '../../../initialValues/authInitials';
import { login } from '../../../redux/actions/authActions';
import { RootState } from '../../../redux/store';
import { LoginCredentials } from '../../../types/authTypes';
import styles from './LoginPage.module.scss';

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
      navigate('/');
    }
  }, [isLoggedIn, navigate, dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(loginCredentials))
  };

  return (
    <div className={styles.loginContainer}>
      <LoginForm handleSetLoginCredentials={handleSetLoginCredentials} setIsFormValid={setIsFormValid} />
      Register: <Link className={styles.navbarLink} to="/register"> Register </Link>

      {isFormValid && (
        <>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
