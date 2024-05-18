import React from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import stripePromise from '../stripe/stripe';
import { payWithCard } from '../redux/actions/paymentActions';
import { useAppDispatch } from '../hooks';
import { StripeCheckoutProps } from '../props/stripeCheckoutProps';


const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(payWithCard({ amount, stripe, elements }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Zapłać {amount} zł
            </button>
        </form>
    );
};

export const WrappedStripeCheckout: React.FC<StripeCheckoutProps> = ({ amount }) => (
    <Elements stripe={stripePromise}>
        <StripeCheckout amount={amount} />
    </Elements>
);

export default WrappedStripeCheckout;
