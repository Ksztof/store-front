import React, { useEffect, useState } from 'react';
import WrappedStripeCheckout from '../../components/stripeCheckout/StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShippingDetails, MethodOfPayment, MakeOrderPayload, OrderMethod } from '../../types/orderTypes';
import { ShippingDetailsForm } from '../../components/shippingDetailsForm/ShippingDetailsForm';
import PaymentMethodSelector from '../../components/paymentMethodSelector/PaymentMethodSelector';
import { useAppDispatch } from '../../hooks';
import { makeOrder, resetOrder } from '../../redux/actions/orderActions';
import { resetPayment, updatePaymentStatusSuccess } from '../../redux/actions/paymentActions';
import OrderSummary from '../../components/orderSummary/OrderSummary';
import { changeCartContentGlobally, resetCart } from '../../redux/actions/cartActions';
import { shippingDetailsInitialValues } from '../../initialValues/orderInitials';
import { ReducerStates } from "../../types/sharedTypes";
import styles from './OrderPage.module.scss';
import ProductsToOrder from '../../components/productsToOrder/ProductsToOrder';
import { AboutCart } from '../../types/cartTypes';

export const OrderPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const toPay: number = useSelector((state: RootState) => state.cart.cartData.totalCartValue);
    const paymentState: string = useSelector((state: RootState) => state.payment.status);
    const isCartEmpty: boolean = useSelector((state: RootState) => state.cart.isEmpty);
    const [paymentMethod, setPaymentMethod] = useState<MethodOfPayment>(MethodOfPayment.NotSet);
    const [shippingDetails, setShippingDetailsState] = useState<ShippingDetails>(shippingDetailsInitialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
    const isCartChanged: boolean = useSelector((state: RootState) => state.cart.isCartChanged);
    
    useEffect(() => {
        console.log(`isCartChanged: ${isCartChanged}`)
    }, [isCartChanged]);

    const handleSetShippingDetails = (values: Partial<ShippingDetails>) => {
        setShippingDetailsState(prev => ({ ...prev, ...values }));
    };

    const handleDeliveryOrder = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`isCartChanged in handleDeliveryOrder: ${isCartChanged}`)

        if (isCartChanged) {
            console.log("Is in isCartChanged == true block")
            await dispatch(changeCartContentGlobally(cartContent));
        }

        const makeOrderPayload: MakeOrderPayload = { shippingDetails: shippingDetails, orderMethod: OrderMethod.UponDelivery }
        const orderResult = await dispatch(makeOrder(makeOrderPayload));
        if (orderResult.type.endsWith('fulfilled')) {
            dispatch(updatePaymentStatusSuccess());
        }
    };

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
                        {!isCartEmpty && (
                            <div className={styles.optionsContainer}>
                                <PaymentMethodSelector setPaymentMethod={setPaymentMethod} />
                                {paymentMethod === MethodOfPayment.Card ? (
                                    <div className={styles.paymentContainer}>
                                        <WrappedStripeCheckout amount={toPay} shippingDetails={shippingDetails} isFormValid={isFormValid} />
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
