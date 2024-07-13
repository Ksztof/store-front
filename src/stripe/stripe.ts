import { Appearance, loadStripe, Stripe } from '@stripe/stripe-js';
const stripePublicKey: string | undefined = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('REACT_APP_STRIPE_PUBLIC_KEY is not defined');
}
export const appearance: Appearance = {
  theme: 'night',
};
console.log('Appearance:', appearance);

const stripePromise: Promise<Stripe | null> = loadStripe(stripePublicKey);
export default stripePromise;
