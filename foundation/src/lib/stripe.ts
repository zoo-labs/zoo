import { loadStripe } from '@stripe/stripe-js';

/**
 * Stripe, when there is a key for it.
 *
 * `loadStripe('')` throws IntegrationError before a frame is drawn, and both
 * pages that mount <Elements> called it inline, on every render, with
 * `NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''`. A species page threw three times on
 * load. A static export ships without that variable set, so "no key" is the
 * ordinary case and has to be a value rather than an exception:
 * `<Elements stripe={null}>` renders its children and `useStripe()` answers
 * null, which is what a checkout handler has to test for anyway.
 *
 * Resolved once, at module scope. NEXT_PUBLIC_* is substituted at build time,
 * so there is nothing to re-read per render.
 */
const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

export const stripe = key ? loadStripe(key) : null;
