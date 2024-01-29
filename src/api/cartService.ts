import axios from 'axios';
import { AboutCart } from '../types/cartTypes';

export const getCartContent = async () => {
  const response = await axios.get<AboutCart>('https://localhost:5445/api/Carts', {
    withCredentials: true
  });
  return response.data;
};
