import axios from 'axios';
import { ProductDetails } from '../types/productTypes';

export const getAllProducts = async () => {
  const response = await axios.get<ProductDetails[]>('https://localhost:5445/api/Products');
  return response.data;
};
