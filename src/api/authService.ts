import axios from 'axios';
import { LoginCredentials, RegisterCredentials } from '../types/authTypes';

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axios.post('https://localhost:5445/api/User/login', credentials);
  return response.data;
};

export const registerUser = async (credentials: RegisterCredentials) => {

  const response = await axios.post('https://localhost:5445/api/User', credentials);
  return response.data;
};
