import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axios.post('https://localhost:5445/api/User/login', credentials);
  return response.data;
};
