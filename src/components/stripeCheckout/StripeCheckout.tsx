import React, { useEffect, useState } from 'react';
import { useElements, Elements, PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { useAppDispatch } from '../../hooks';
import { StripeCheckoutProps, WrappedStripeCheckoutProps } from '../../props/stripeCheckoutProps';
import { makeOrder } from '../../redux/actions/orderActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startConnection } from '../../signalR/hubConnection';
import { OrderResponse } from '../../types/orderTypes';
import { ReducerStates } from '../../types/sharedTypes';
import styles from './StripeCheckout.module.scss';
import { Appearance, PaymentIntent } from '@stripe/stripe-js';
import stripePromise from '../../stripe/stripe';
import { startOrderProcess, startPaymentConfirmation } from '../../redux/actions/paymentActions';
import { StartOrderPayload } from '../../types/paymentTypes';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails, isFormValid }) => {
    const stripe = useStripe();
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const dispatch = useAppDispatch();
    const orderState: string = useSelector((state: RootState) => state.order.status);
    const elements = useElements();
    const paymentIntentResponse: PaymentIntent | null = useSelector((state: RootState) => state.payment.paymentIntent);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);

    const appearance: Appearance = {
        theme: 'night',
    };

    useEffect(() => {
        if (stripe && elements) {
            const startOrderPayload: StartOrderPayload = { amount, stripe, elements };
            dispatch(startOrderProcess(startOrderPayload));
        }
    }, [stripe, elements, dispatch, amount]);

    useEffect(() => {
        if (paymentIntentResponse && paymentIntentResponse.id) {
            setClientSecret(paymentIntentResponse.client_secret);
            setPaymentIntent(paymentIntentResponse)
        }
    }, [paymentIntentResponse]);


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

        if (paymentIntent && orderState === ReducerStates.Fulfilled) {
            dispatch(startPaymentConfirmation({ paymentIntent: paymentIntent }));
        } else {
            const orderResult = await dispatch(makeOrder(orderDetails));
            if (paymentIntent && orderResult.meta.requestStatus.endsWith("fulfilled")) {
                dispatch(startPaymentConfirmation({ paymentIntent: paymentIntent }));
            }
        }
    };

    return (
        <div className={styles.paymentFormContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.cardElement}>
                    <PaymentElement/>
                
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

const WrappedStripeCheckout: React.FC<WrappedStripeCheckoutProps> = ({ amount, orderDetails, isFormValid }) => (


    <Elements stripe={stripePromise} >
        <StripeCheckout
            orderDetails={orderDetails}
            isFormValid={isFormValid}
            amount={amount} />
    </Elements>

);

export default WrappedStripeCheckout;