import React, { useEffect, useRef, useState } from 'react';
import { useElements, Elements, PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { useAppDispatch } from '../../hooks';
import { paymentOptions, StripeCheckoutProps, WrappedStripeCheckoutProps } from '../../props/stripeCheckoutProps';
import { makeOrder } from '../../redux/actions/orderActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startConnection } from '../../signalR/hubConnection';
import { OrderResponse } from '../../types/orderTypes';
import { ReducerStates } from '../../types/sharedTypes';
import styles from './StripeCheckout.module.scss';
import { Appearance } from '@stripe/stripe-js';
import stripePromise from '../../stripe/stripe';
import { confirmPayment, getClientSecret, updatePaymentIntent } from '../../redux/actions/paymentActions';
import { AsyncTasksParams, PaymentConfirmationPayload } from '../../types/paymentTypes';
import useAsyncEffect from '../../hooks/useAsyncEffect ';
import { HubConnection } from '@microsoft/signalr';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails, isFormValid, clientSecret }) => {
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const orderState: string = useSelector((state: RootState) => state.order.status);

    const connectionRef = useRef<HubConnection | null>(null);

    const payload: PaymentConfirmationPayload = {
        stripe: stripe,
        elements: elements,
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const connection: HubConnection = startConnection(dispatch, orderSummary.id);
        connectionRef.current = connection;

        await dispatch(makeOrder(orderDetails))
        await dispatch(updatePaymentIntent(clientSecret))
        await dispatch(confirmPayment(payload));

        if (orderState === ReducerStates.Fulfilled) {
            await dispatch(confirmPayment(payload));
            return;
        }
    };

    useEffect(() => {
        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
            }
        };
    }, []);

    return (
        <div className={styles.paymentFormContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.cardElement}>
                    <PaymentElement options={paymentOptions} />
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
    const clientSecretResponse: string = useSelector((state: RootState) => state.payment.clientSecret);
    const [clientSecret, setClientSecret] = useState<string>();
    const appearance: Appearance = { theme: 'night' };

    const performAsyncTasks = async ({
        amount,
        dispatch,
        signal,
    }: AsyncTasksParams) => {

        if (!signal.aborted && amount && clientSecretResponse !== clientSecret) {
            await dispatch(getClientSecret({ amount }));
        }
    };

    useAsyncEffect(async (signal: AbortSignal) => {
        await performAsyncTasks({
            amount,
            dispatch,
            signal,
        });
    }, [amount, dispatch]);

    useEffect(() => {
        if (clientSecretResponse && clientSecretResponse !== clientSecret && typeof clientSecretResponse === 'string' && clientSecretResponse.trim() !== '') {
            setClientSecret(clientSecretResponse);
        }
    }, [clientSecretResponse, clientSecret]);

    if (!clientSecret) return <div>Loading...</div>;
    console.log(clientSecret)
    return (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }} key={clientSecret}>
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