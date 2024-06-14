import React, { useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import stripePromise from '../stripe/stripe';
import { useAppDispatch } from '../hooks';
import { StripeCheckoutProps } from '../props/stripeCheckoutProps';
import { PayWithCardPayload } from '../types/paymentTypes';
import { payWithCard } from '../redux/actions/paymentActions';
import { makeOrder } from '../redux/actions/orderActions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { startConnection } from '../signalR/hubConnection';
import { OrderResponse } from '../types/orderTypes';
import { ReducerStates } from '../types/sharedTypes';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails }) => {
    const stripe = useStripe();
    const elements = useElements();
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);
    const dispatch = useAppDispatch();
    const orderState: string = useSelector((state: RootState) => state.order.status);

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
            console.log(" ReducerStates.Fulfilled andPAYMENT PROCESS");

        } else {
            const orderResult = await dispatch(makeOrder(orderDetails));
            if (orderResult.meta.requestStatus.endsWith("fulfilled")) {
                dispatch(payWithCard(payWithCardPayload));
                console.log(" ReducerStates.Rejected and PAYMENT PROCESS");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                <p> Zapłać {amount} zł</p>
            </button>
        </form>
    );
};

export const WrappedStripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails }) => (
    <Elements stripe={stripePromise}>
        <StripeCheckout amount={amount} orderDetails={orderDetails} />
    </Elements>
);

export default WrappedStripeCheckout;
