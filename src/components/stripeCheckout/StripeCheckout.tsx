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
import { PaymentConfirmationPayload, StartOrderPayload } from '../../types/paymentTypes';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails, isFormValid, clientSecret }) => {
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const orderState: string = useSelector((state: RootState) => state.order.status);

    const payload: PaymentConfirmationPayload = {
        clientSecret: clientSecret,
        stripe: stripe,
        elements: elements,
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

        if (orderState === ReducerStates.Fulfilled) {
            dispatch(startPaymentConfirmation(payload));
        } else {
            const orderResult = await dispatch(makeOrder(orderDetails));
            if (orderResult.meta.requestStatus.endsWith("fulfilled")) {
                dispatch(startPaymentConfirmation(payload));
            }
        }
    };

    return (
        <div className={styles.paymentFormContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.cardElement}>
                    <PaymentElement />

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

const WrappedStripeCheckout: React.FC<WrappedStripeCheckoutProps> = ({ amount, orderDetails, isFormValid }) => {
    const dispatch = useAppDispatch();
    const paymentIntentResponse: PaymentIntent | null = useSelector((state: RootState) => state.payment.paymentIntent);
    const [clientSecret, setClientSecret] = useState<string>();
    const appearance: Appearance = { theme: 'night' };

    useEffect(() => {
        const startOrderPayload: StartOrderPayload = { amount };
        dispatch(startOrderProcess(startOrderPayload));
    }, [dispatch, amount]);

    useEffect(() => {
        if (paymentIntentResponse && paymentIntentResponse.id && paymentIntentResponse.client_secret) {
            setClientSecret(paymentIntentResponse.client_secret);
        }
    }, [paymentIntentResponse]);


    if (!clientSecret) return <div>Loading...</div>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <StripeCheckout
                orderDetails={orderDetails}
                isFormValid={isFormValid}
                amount={amount}
                clientSecret={clientSecret}
            />
        </Elements>
    );
};

export default WrappedStripeCheckout;