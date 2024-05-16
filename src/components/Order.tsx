import React from 'react';
import { OrderDetails } from './OrderDetails';
import WrappedStripeCheckout from './StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


export const Order: React.FC = () => {
    const toPay: number = useSelector((state: RootState) => state.cart.cartDetails.aboutCart.totalCartValue);

    return (
        <div>
            <h1>Order Page</h1>
            < OrderDetails />
            <h1>Your order</h1>
            <WrappedStripeCheckout amount={toPay} /> Order amount {toPay}
        </div>

    );
}
