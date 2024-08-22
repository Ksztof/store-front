import { loadStripe, Stripe } from '@stripe/stripe-js';
// const stripePublicKey: string | undefined = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

// if (!stripePublicKey) {
//   throw new Error('REACT_APP_STRIPE_PUBLIC_KEY is not defined');
// }


const stripePromise: Promise<Stripe | null> = loadStripe("pk_live_51PH7SrG6csTGDew6p30O33xtYLePxXAofwgmhzHaMnx43T7sNmGNJL0wo8yuinjyuXkGGB3jy0UhHPh0Q8izJfCL00lguKB4O9");

export default stripePromise;
