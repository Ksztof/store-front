import React, { useEffect, useRef, useState } from 'react';
import { useElements, Elements, PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { paymentOptions, StripeCheckoutProps, WrappedStripeCheckoutProps } from '../../paymentProps';
import { useSelector } from 'react-redux';
import { startConnection } from '../../signalR/hubConnection';
import { MakeOrderPayload, OrderResponse } from '../../../order/orderTypes';
import { ReducerStates } from '../../../shared/sharedTypes';
import styles from './StripeCheckout.module.scss';
import { Appearance } from '@stripe/stripe-js';
import stripePromise from '../../stripe';
import { AsyncTasksParams, PaymentConfirmationPayload } from '../../paymentTypes';
import useAsyncEffect from '../../../shared/hooks/useAsyncEffect ';
import { HubConnection } from '@microsoft/signalr';
import { AboutCart } from '../../../cart/cartTypes';
import { saveCartContent } from '../../../cart/cartActions';
import { makeOrder } from '../../../order/orderActions';
import { RootState } from '../../../shared/redux/store';
import { updatePaymentIntent, confirmPayment, getClientSecret } from '../../paymentActions';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, shippingDetails, isFormValid, clientSecret }) => {
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const orderState: string = useSelector((state: RootState) => state.order.status);
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
    const isCartChanged: boolean = useSelector((state: RootState) => state.cart.isCartChanged);
    const connectionRef = useRef<HubConnection | null>(null);

    const payload: PaymentConfirmationPayload = {
        stripe: stripe,
        elements: elements,
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const connection: HubConnection = startConnection(dispatch, orderSummary.id);
        connectionRef.current = connection;

        if (isCartChanged) {
            await dispatch(saveCartContent(cartContent));
        }

        const makeOrderPayload: MakeOrderPayload = { shippingDetails: shippingDetails, orderMethod: null };
        await dispatch(makeOrder(makeOrderPayload))
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
        <form className={styles.paymentForm} onSubmit={handleSubmit}>
            <div className={styles.paymentElementContainer}>
                <PaymentElement options={paymentOptions} />
            </div>
            <div className={`${styles.payButton} ${isFormValid ? styles.formValid : ''}`}>
                <button type="submit" disabled={!stripe}>
                    <p> Pay {amount} zł</p>
                </button>
            </div>
        </form>
    );
};

const WrappedStripeCheckout: React.FC<WrappedStripeCheckoutProps> = ({ amount, shippingDetails, isFormValid }) => {
    const dispatch = useAppDispatch();
    const clientSecretResponse: string = useSelector((state: RootState) => state.payment.clientSecret);
    const [clientSecret, setClientSecret] = useState<string>();
    const appearance: Appearance = {
        theme: 'night',
        variables: {
            fontFamily: 'Open Sans, sans-serif',
            fontSizeBase: '18px',
        }
    };

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
    
    return (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }} key={clientSecret}>
            <StripeCheckout
                shippingDetails={shippingDetails}
                isFormValid={isFormValid}
                amount={amount}
                clientSecret={clientSecret}
            />
        </Elements>
    );
};

export default WrappedStripeCheckout;