import React, { useEffect, useState } from 'react';
import WrappedStripeCheckout from './StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { orderDetailsInitialValues } from '../initialValues/orderInitials';
import { OrderDetails, OrderResponse } from '../types/orderTypes';
import { ShippingDetails } from './ShippingDetails';
import { PaymentStatus } from '../types/paymentTypes';
import { CheckCart } from '../types/cartTypes';
import { OrderedProducts } from './OrderedProducts';
import { startConnection } from '../signalR/hubConnection';
import { useAppDispatch } from '../hooks';


export const Order: React.FC = () => {
    const toPay: number = useSelector((state: RootState) => state.cart.cartDetails.aboutCart.totalCartValue);
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const paymentStatus = useSelector((state: RootState) => state.payment.status);
    const dispatch = useAppDispatch();

    const [orderDetails, setOrderDetailsState] = useState<OrderDetails>(orderDetailsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const handleSetOrderDetails = (values: Partial<OrderDetails>) => {
        setOrderDetailsState(prev => ({ ...prev, ...values }));
    };

    // useEffect(() => {
    //     if (orderSummary.id) {
    //         const connection = startConnection(dispatch, orderSummary.id);
    //         return () => {
    //             connection.stop();
    //         };
    //     }
    // }, [orderSummary, dispatch]);

    return (
        <div>
            <h1>Order Page</h1>
            {paymentStatus === PaymentStatus.Succeeded ? (
                <div>
                    <h1>Order Summary</h1>
                    <p>Order ID: {orderSummary.id}</p>
                    <p>Total Amount: {orderSummary.totalCartValue}</p>
                    <p>Status: paid</p>
                    <p>Products</p>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderSummary.aboutProductsInCart.map((product: CheckCart) => (
                                    <OrderedProducts key={product.productId} product={product} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <>
                    < ShippingDetails handleSetOrderDetails={handleSetOrderDetails} setIsFormValid={setIsFormValid} />

                    {isFormValid && (
                        <>
                            <h1>Your order</h1>
                            <WrappedStripeCheckout amount={toPay} orderDetails={orderDetails} />
                            <p>Order amount {toPay}</p>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
