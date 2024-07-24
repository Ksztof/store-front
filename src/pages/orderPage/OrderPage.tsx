import React, { useEffect, useState } from 'react';
import WrappedStripeCheckout from '../../components/stripeCheckout/StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShippingDetails, MethodOfPayment } from '../../types/orderTypes';
import { ShippingDetailsForm } from '../../components/shippingDetailsForm/ShippingDetailsForm';
import PaymentMethodSelector from '../../components/paymentMethodSelector/PaymentMethodSelector';
import { useAppDispatch } from '../../hooks';
import { makeOrder, resetOrder } from '../../redux/actions/orderActions';
import { resetPayment, updatePaymentStatusSuccess } from '../../redux/actions/paymentActions';
import OrderSummary from '../../components/orderSummary/OrderSummary';
import { Link } from 'react-router-dom';
import { resetCart } from '../../redux/actions/cartActions';
import { shippingDetailsInitialValues } from '../../initialValues/orderInitials';
import { ReducerStates } from "../../types/sharedTypes";
import styles from './OrderPage.module.scss';
import ProductsToOrder from '../../components/productsToOrder/ProductsToOrder';

export const OrderPage: React.FC = () => {
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
            }
        }
    }, [paymentState, isCartEmpty, dispatch]);

    return (
        <>
            <div className={styles.orderSummaryContainer}>
                {paymentState === ReducerStates.Fulfilled ? (
                    <>
                        <div className={styles.orderedProducts}>
                            <OrderSummary paymentMethod={paymentMethod} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.productsToOrderContainer}>
                            <ProductsToOrder />
                        </div>
                        <div className={styles.shipDetForm}>
                            <ShippingDetailsForm handleSetShippingDetails={handleSetShippingDetails} setIsFormValid={setIsFormValid} />
                        </div>
                        {isCartEmpty !== true && (
                            <div className={styles.optionsContainer}>
                                <PaymentMethodSelector setPaymentMethod={setPaymentMethod} />
                                {paymentMethod === MethodOfPayment.Card ? (
                                    <div className={styles.paymentContainer}>
                                        <WrappedStripeCheckout amount={toPay} orderDetails={shippingDetails} isFormValid={isFormValid} />
                                    </div>
                                ) : paymentMethod === MethodOfPayment.OnDelivery ? (
                                    <div className={`${styles.OrderNowBtn} ${isFormValid ? styles.formValid : ''}`}>
                                        <button onClick={handleDeliveryOrder}>Order Now</button>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
export default OrderPage;
