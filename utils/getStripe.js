import { loadStripe } from "@stripe/stripe-js";

export const getStripe = () => {
  return loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
};
