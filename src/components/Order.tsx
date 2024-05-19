import React, { useEffect, useState } from 'react';
import { OrderDetails } from './OrderDetails';
import WrappedStripeCheckout from './StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { orderDetailsInitialValues } from '../initialValues/orderInitials';
import { OrderDetailsInitialValues } from '../types/orderTypes';


export const Order: React.FC = () => {
    const toPay: number = useSelector((state: RootState) => state.cart.cartDetails.aboutCart.totalCartValue);
    const [orderDetails, setOrderDetailsState] = useState<OrderDetailsInitialValues>(orderDetailsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);



    const handleSetOrderDetails = (values: Partial<OrderDetailsInitialValues>) => {
        setOrderDetailsState(prev => ({ ...prev, ...values }));
    };

    return (
        <div>
            <h1>Order Page</h1>
            < OrderDetails handleSetOrderDetails={handleSetOrderDetails} setIsFormValid={setIsFormValid} />

            {isFormValid && (
                <>
                    <h1>Your order</h1>
                    <WrappedStripeCheckout amount={toPay} />
                    <p>Order amount {toPay}</p>
                </>
            )}
        </div>
    );
}
