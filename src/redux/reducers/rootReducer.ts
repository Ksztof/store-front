import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import paymentReducer from './paymentReducer';
import orderReducer from './orderReducer';
import errorReducer from './errorReducer';

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  payment: paymentReducer,
  order: orderReducer,
  error: errorReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
