import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import paymentReducer from './paymentReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  payment: paymentReducer,
  order: orderReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
