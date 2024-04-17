import axios from 'axios';
import { AboutCart } from '../types/cartTypes';

axios.defaults.withCredentials = true;

export const getCartContent = async () => {
  const response = await axios.get<AboutCart>('https://localhost:5445/api/Carts', {});

  return response.data;
};
