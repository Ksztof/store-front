import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { login, resetAuth } from '../redux/actions/authActions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../types/authTypes';
import { loginCredentialsInitialValues } from '../initialValues/authInitials';
import { LoginForm } from '../components/LoginForm';

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
    <div>
      <LoginForm handleSetLoginCredentials={handleSetLoginCredentials} setIsFormValid={setIsFormValid} />
      {isFormValid && (
        <>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
