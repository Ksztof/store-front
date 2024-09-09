import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from '../../../authentication/authReducer';
import cartReducer from '../../../cart/cartReducer';
import orderReducer from '../../../order/orderReducer';
import paymentReducer from '../../../payment/paymentReducer';
import productReducer from '../../../product/productReducer';

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
