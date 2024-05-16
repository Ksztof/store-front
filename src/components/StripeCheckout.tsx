// StripeCheckout.tsx
import React from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { submitPayment } from '../api/paymentService';
import stripePromise from '../stripe/stripe';

interface Props {
    amount: number;
}

const StripeCheckout: React.FC<Props> = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
        });

        if (error) {
            console.error(error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            console.log('Success');

            //submitPayment(paymentMethod.id, amount);
        }
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
