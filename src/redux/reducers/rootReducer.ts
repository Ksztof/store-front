import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import cartLocStorReducer from './cartLocStorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  cartLocStor: cartLocStorReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
