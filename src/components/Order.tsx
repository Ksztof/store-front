import React, { useState } from 'react';
import WrappedStripeCheckout from './StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { orderDetailsInitialValues } from '../initialValues/orderInitials';
import { OrderDetails } from '../types/orderTypes';
import { ShippingDetails } from './ShippingDetails';


export const Order: React.FC = () => {
    const toPay: number = useSelector((state: RootState) => state.cart.cartDetails.aboutCart.totalCartValue);
    const [orderDetails, setOrderDetailsState] = useState<OrderDetails>(orderDetailsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleSetOrderDetails = (values: Partial<OrderDetails>) => {
        setOrderDetailsState(prev => ({ ...prev, ...values }));
    };

    return (
        <div>
            <h1>Order Page</h1>
            < ShippingDetails handleSetOrderDetails={handleSetOrderDetails} setIsFormValid={setIsFormValid} />

            {isFormValid && (
                <>
                    <h1>Your order</h1>
                    <WrappedStripeCheckout amount={toPay} orderDetails={orderDetails} />
                    <p>Order amount {toPay}</p>
                </>
            )}
        </div>
    );
}
