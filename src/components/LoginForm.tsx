import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { login } from '../redux/actions/authActions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
      if (isLoggedIn) {
          navigate('/');
      }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
