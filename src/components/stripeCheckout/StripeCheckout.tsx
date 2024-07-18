import React, { useEffect, useState } from 'react';
import { useElements, Elements, PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { useAppDispatch } from '../../hooks';
import { StripeCheckoutProps, WrappedStripeCheckoutProps } from '../../props/stripeCheckoutProps';
import { makeOrder } from '../../redux/actions/orderActions';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { startConnection } from '../../signalR/hubConnection';
import { OrderResponse, ShippingDetails } from '../../types/orderTypes';
import { ReducerStates } from '../../types/sharedTypes';
import styles from './StripeCheckout.module.scss';
import { Appearance, StripePaymentElementOptions } from '@stripe/stripe-js';
import stripePromise from '../../stripe/stripe';
import { confirmPayment, getClientSecret } from '../../redux/actions/paymentActions';
import { AsyncTasksParams, PaymentConfirmationPayload } from '../../types/paymentTypes';
import useAsyncEffect from '../../hooks/useAsyncEffect ';

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

    const paymentOptions: StripePaymentElementOptions = {
        fields: {
            billingDetails: {
                address: {
                    country: 'never',
                },
            }
        },
        wallets: {
            applePay: 'never',
            googlePay: 'never'
        }
    };

    useEffect(() => {
        console.log(`orderSummary.id ${orderSummary.id}`)
        if (orderSummary.id) {
            const connection = startConnection(dispatch, orderSummary.id);
            return () => {
                connection.stop();
            };
        }
    }, [orderSummary, orderState, dispatch]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(makeOrder(orderDetails))

        if (orderState === ReducerStates.Fulfilled) {
            dispatch(confirmPayment(payload));
        } else {
            const orderResult = await dispatch(makeOrder(orderDetails));
            if (orderResult.meta.requestStatus.endsWith("fulfilled")) {
                dispatch(confirmPayment(payload));
            }
        }
    };

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
    const orderState: string = useSelector((state: RootState) => state.order.status);
    const clientSecretResponse: string = useSelector((state: RootState) => state.payment.clientSecret);
    const [clientSecret, setClientSecret] = useState<string>();
    const appearance: Appearance = { theme: 'night' };

    const performAsyncTasks = async ({
        orderState,
        amount,
        orderDetails,
        dispatch,
        signal,
    }: AsyncTasksParams) => {
        if (orderState === ReducerStates.Fulfilled) {
            await dispatch(getClientSecret({ amount }));
            return;
        }

        const orderResult = await dispatch(makeOrder(orderDetails));
        if (orderResult.meta.requestStatus.endsWith("fulfilled")) {
            if (!signal.aborted) {
                await dispatch(getClientSecret({ amount }));
            }
        }
    };
    
    useAsyncEffect(async (signal: AbortSignal) => {
        await performAsyncTasks({
            orderState,
            amount,
            orderDetails,
            dispatch,
            signal,
        });
    }, [orderState, amount, orderDetails, dispatch]);

    useEffect(() => {
        if (typeof clientSecretResponse === 'string' && clientSecretResponse.trim() !== '') {
            setClientSecret(clientSecretResponse);
        }
    }, [clientSecretResponse]);

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