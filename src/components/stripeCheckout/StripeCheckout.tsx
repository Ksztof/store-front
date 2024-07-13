import React, { useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import stripePromise, { appearance } from '../../stripe/stripe';
import { useAppDispatch } from '../../hooks';
import { StripeCheckoutProps } from '../../props/stripeCheckoutProps';
import { PayWithCardPayload } from '../../types/paymentTypes';
import { payWithCard } from '../../redux/actions/paymentActions';
import { makeOrder } from '../../redux/actions/orderActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startConnection } from '../../signalR/hubConnection';
import { OrderResponse } from '../../types/orderTypes';
import { ReducerStates } from '../../types/sharedTypes';
import styles from './StripeCheckout.module.scss';
import { Appearance, StripeCardElementOptions } from '@stripe/stripe-js';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails, isFormValid }) => {
    const stripe = useStripe();
    const elements = useElements();
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const dispatch = useAppDispatch();
    const orderState: string = useSelector((state: RootState) => state.order.status);
    
    const cardElementOption: StripeCardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
            },
        },
        hidePostalCode: true, 
    };

    useEffect(() => {
        if (orderSummary.id) {
            const connection = startConnection(dispatch, orderSummary.id);
            return () => {
                connection.stop();
            };
        }
    }, [orderSummary, orderState, dispatch]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const payWithCardPayload: PayWithCardPayload = { amount, stripe, elements };
        if (orderState === ReducerStates.Fulfilled) {
            dispatch(payWithCard(payWithCardPayload));

        } else {
            const orderResult = await dispatch(makeOrder(orderDetails));
            if (orderResult.meta.requestStatus.endsWith("fulfilled")) {
                dispatch(payWithCard(payWithCardPayload));
            }
        }
    };

    return (
        <div className={styles.paymentFormContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.cardElement}>
                    <CardElement options={cardElementOption}/>
                </div>
                <div className={`${styles.payButton} ${isFormValid ? styles.formValid : ''}`}>
                    <button type="submit" disabled={!stripe}>
                        <p> Pay {amount} zł</p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export const WrappedStripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails, isFormValid }) => (
    <Elements stripe={stripePromise} options={{appearance}}>

        <StripeCheckout amount={amount} orderDetails={orderDetails} isFormValid={isFormValid} />
    </Elements>
);

export default WrappedStripeCheckout;
