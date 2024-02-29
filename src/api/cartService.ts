import axios from 'axios';
import { AboutCartApi } from '../types/cartTypes';

axios.defaults.withCredentials = true;

export const getCartContent = async () => {
  const response = await axios.get<AboutCartApi>('https://localhost:5445/api/Carts', {});

  return response.data;
};
