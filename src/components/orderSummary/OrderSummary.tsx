import React from 'react';
import { MethodOfPayment, OrderResponse, OrderSummaryProps } from '../../types/orderTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CheckCart } from '../../types/cartTypes';
import { OrderedProductSummary } from '../orderedProductSummary/OrderedProductSummary';
import styles from './OrderSummary.module.scss';
import { Link } from 'react-router-dom';
import { resetOrder } from '../../redux/actions/orderActions';
import { resetPayment } from '../../redux/actions/paymentActions';
import { resetCart } from '../../redux/actions/cartActions';
import { useAppDispatch } from '../../hooks';
import { removeGuestSessionIdApi } from '../../api/authService';
import { isGuestUser } from '../../utils/cookiesUtils';

export const OrderSummary: React.FC<OrderSummaryProps> = ({ paymentMethod }) => {
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const dispatch = useAppDispatch();

    const handleRedirect = () => {
        if(isGuestUser()){
            dispatch(removeGuestSessionIdApi());
        }
        dispatch(resetOrder());
        dispatch(resetPayment());
        dispatch(resetCart());
    };
    
    return (
        <>
            <div className={styles.summaryTitle}>
                <h2>Thank you for your order!</h2>
                <p>
                    Payment status: {paymentMethod === MethodOfPayment.Card ? (
                        <>Paid</>
                    ) : (
                        <>Payment upon delivery</>
                    )}
                </p>
            </div>

            <div className={styles.summaryHeader}>
                <div className={styles.title}></div>
                <div className={styles.title}>Name</div>
                <div className={styles.title}>Quantity</div>
                <div className={styles.title}>Unit Price</div>
                <div className={styles.title}>Total Price</div>
            </div>
            <div className={styles.orderedProductsContainer}>
                {orderSummary.aboutProductsInCart.map((product: CheckCart) => (
                    <OrderedProductSummary key={product.productId} product={product} />
                ))}
            </div>
            <div className={styles.amountRow}>
                <div className={styles.amountTitle}>Total:</div>
                <div className={styles.amountValue}>{orderSummary.totalCartValue} zł</div>
            </div>
            <div className={styles.mainLink}>
                <Link to="/" onClick={handleRedirect}>OK</Link>
            </div>
        </>
    );
};

export default OrderSummary;