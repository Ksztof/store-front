import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
