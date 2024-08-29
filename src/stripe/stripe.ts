import { loadStripe, Stripe } from '@stripe/stripe-js';
// const stripePublicKey: string | undefined = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

// if (!stripePublicKey) {
//   throw new Error('REACT_APP_STRIPE_PUBLIC_KEY is not defined');
// }


const stripePromise: Promise<Stripe | null> = loadStripe("pk_test_51PH7SrG6csTGDew6yuvEeNDHR0L7ViX1mKn0UmzEfFEs6Xvp4f91aEaWBuYkgO8BdmnWLeeIHtoEQyYgSLgEYSie00Jw4YBFKD");

export default stripePromise;
