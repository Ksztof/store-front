import axios from 'axios';

export const getCartContent = async () => {
  const response = await axios.get<AboutCart>('https://localhost:5445/api/Carts');
  return response.data;
};
