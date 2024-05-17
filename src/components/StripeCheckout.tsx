import React from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import stripePromise from '../stripe/stripe';
import { Props } from '../types/stripeTypes';
import { payWithCard } from '../redux/actions/paymentActions';
import { useAppDispatch } from '../hooks';


const StripeCheckout: React.FC<Props> = ({ amount }: { amount: number }) => {
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

export const WrappedStripeCheckout: React.FC<Props> = ({ amount }: { amount: number }) => (
    <Elements stripe={stripePromise}>
        <StripeCheckout amount={amount} />
    </Elements>
);

export default WrappedStripeCheckout;
