import React, { useEffect, useState } from 'react';
import WrappedStripeCheckout from './StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { orderDetailsInitialValues } from '../initialValues/orderInitials';
import { OrderDetails, MethodOfPayment } from '../types/orderTypes';
import { ShippingDetails } from './ShippingDetails';
import { PaymentStatus } from '../types/paymentTypes';
import PaymentMethodSelector from './PaymentMethodSelector';
import ProductsToOrder from './ProductsToOrder';
import { useAppDispatch } from '../hooks';
import { makeOrder, resetOrder } from '../redux/actions/orderActions';
import { resetPayment, updatePaymentStatusSuccess } from '../redux/actions/paymentActions';
import OrderSummary from './OrderSummary';
import { Link } from 'react-router-dom';
import { resetCart } from '../redux/actions/cartActions';

export const Order: React.FC = () => {
    const dispatch = useAppDispatch();

    const toPay: number = useSelector((state: RootState) => state.cart.cartData.totalCartValue);
    const paymentStatus = useSelector((state: RootState) => state.payment.status);

    const [paymentMethod, setPaymentMethod] = useState<MethodOfPayment>(MethodOfPayment.NotSet);
    const [orderDetails, setOrderDetailsState] = useState<OrderDetails>(orderDetailsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleSetOrderDetails = (values: Partial<OrderDetails>) => {
        setOrderDetailsState(prev => ({ ...prev, ...values }));
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsFormValid(true);
    };

    const handleDeliveryOrder = async (event: React.FormEvent) => {
        event.preventDefault();
        const orderResult = await dispatch(makeOrder(orderDetails));
        if (orderResult.type.endsWith('fulfilled')) {
            dispatch(updatePaymentStatusSuccess(PaymentStatus.Succeeded));
        }
    };

    useEffect(() => {
        return () => {
            console.log("payment status"+ paymentStatus);
            if (paymentStatus === PaymentStatus.Succeeded) {
                dispatch(resetOrder());
                dispatch(resetPayment());
                dispatch(resetCart());
            };
        }

    }, [paymentStatus, dispatch]);


    return (
        <div>
            {paymentStatus === PaymentStatus.Succeeded ? (
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
                    <form onSubmit={handleFormSubmit}>
                        <ShippingDetails handleSetOrderDetails={handleSetOrderDetails} setIsFormValid={setIsFormValid} />
                        {isFormValid && (
                            <>
                                <PaymentMethodSelector setPaymentMethod={setPaymentMethod} />
                                {paymentMethod === MethodOfPayment.Card ? (
                                    <>
                                        <WrappedStripeCheckout amount={toPay} orderDetails={orderDetails} />
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
                    </form>
                </>
            )}
        </div>
    );
};


export default Order;