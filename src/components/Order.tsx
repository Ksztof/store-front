import React, { useEffect, useState } from 'react';
import WrappedStripeCheckout from './StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ShippingDetails, MethodOfPayment } from '../types/orderTypes';
import { ShippingDetailsForm } from './ShippingDetailsForm';
import PaymentMethodSelector from './PaymentMethodSelector';
import ProductsToOrder from './ProductsToOrder';
import { useAppDispatch } from '../hooks';
import { makeOrder, resetOrder } from '../redux/actions/orderActions';
import { resetPayment, updatePaymentStatusSuccess } from '../redux/actions/paymentActions';
import OrderSummary from './OrderSummary';
import { Link } from 'react-router-dom';
import { resetCart } from '../redux/actions/cartActions';
import { shippingDetailsInitialValues } from '../initialValues/orderInitials';
import { ReducerStates } from "../types/sharedTypes";

export const Order: React.FC = () => {
    const dispatch = useAppDispatch();

    const toPay: number = useSelector((state: RootState) => state.cart.cartData.totalCartValue);
    const paymentState: string = useSelector((state: RootState) => state.payment.status);
    const isCartEmpty: boolean = useSelector((state: RootState) => state.cart.isEmpty);
    const [paymentMethod, setPaymentMethod] = useState<MethodOfPayment>(MethodOfPayment.NotSet);
    const [shippingDetails, setShippingDetailsState] = useState<ShippingDetails>(shippingDetailsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleSetShippingDetails = (values: Partial<ShippingDetails>) => {
        setShippingDetailsState(prev => ({ ...prev, ...values }));
    };

    const handleDeliveryOrder = async (event: React.FormEvent) => {
        event.preventDefault();
        const orderResult = await dispatch(makeOrder(shippingDetails));
        if (orderResult.type.endsWith('fulfilled')) {
            dispatch(updatePaymentStatusSuccess());
        }
    };

    useEffect(() => {
        return () => {
            if (paymentState === ReducerStates.Fulfilled) {
                dispatch(resetOrder());
                dispatch(resetPayment());
                dispatch(resetCart());
            };
        }

    }, [paymentState, isCartEmpty, dispatch]);

    return (
        <div>
            {paymentState === ReducerStates.Fulfilled ? (
                <>
                    <h1>Thank you for your order!</h1>
                    <OrderSummary paymentMethod={paymentMethod} />
                    <div>
                        <Link to="/">OK</Link>
                    </div>
                </>
            ) : (
                <>
                    <ProductsToOrder />
                    <ShippingDetailsForm handleSetShippingDetails={handleSetShippingDetails} setIsFormValid={setIsFormValid} />
                    {isFormValid && isCartEmpty !== true  && (
                        <>
                            <PaymentMethodSelector setPaymentMethod={setPaymentMethod} />
                            {paymentMethod === MethodOfPayment.Card ? (
                                <>
                                    <WrappedStripeCheckout amount={toPay} orderDetails={shippingDetails} />
                                    <p>Order amount {toPay}</p>
                                </>
                            ) : paymentMethod === MethodOfPayment.OnDelivery ? (
                                <>
                                    <button onClick={handleDeliveryOrder}>Order Now</button>
                                </>
                            ) : (
                                <p>Select a payment method</p>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};


export default Order;