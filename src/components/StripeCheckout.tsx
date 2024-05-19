import React from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import stripePromise from '../stripe/stripe';
import { useAppDispatch } from '../hooks';
import { StripeCheckoutProps } from '../props/stripeCheckoutProps';
import { makeOrderCardPayment } from '../redux/actions/paymentActions';
import { MakeOrderCardPaymentPayload } from '../types/orderTypes';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, orderDetails }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const makeOrderCardPaymentPayload: MakeOrderCardPaymentPayload = (
            {amount, stripe, elements, orderDetails}
        );
        dispatch(makeOrderCardPayment({ makeOrderCardPaymentPayload }));
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
