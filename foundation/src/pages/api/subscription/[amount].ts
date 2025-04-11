import { formatAmountForStripe } from "../../../utils/stripe_helpers";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { user } = await supabase.auth.api.getUserByCookie(req);

  // if (!user) {
  //   return res.status(401).send("Unauthorized");
  // }

  // const token = cookie.parse(req.headers.cookie)["sb:token"];

  // supabase.auth.session = () => ({
  //   access_token: token,
  // });

  // const {
  //   data: { stripe_customer },
  // } = await supabase
  //   .from("profile")
  //   .select("stripe_customer")
  //   .eq("id", user.id)
  //   .single();


  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
  })

  const product_name = "support Zoo Labs Foundation";// + new Date().valueOf();
  const product = await stripe.products.create({
    name: product_name,
    description: 'Donation',
  });
  console.log(product.id);
  const { amount } = req.query;
  const numericAmount = typeof amount === 'string' ? Number(amount) : 0;

  const price = await stripe.prices.create({
    unit_amount: formatAmountForStripe(numericAmount,'usd'),
    currency: 'usd',
    product: product.id,
    recurring: {
      interval: 'month',
    },
  });

  const host = req.headers.host;
  const lineItems = [
    {
      price: price.id,
      quantity: 1,
    },
  ];
  const customer = await stripe.customers.create({
    name: "donate_"+ new Date().valueOf(),
  });
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_HOST}/donation?result=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/donation?result=cancelled`,
  });
  console.log("subscription:",session.id);
  res.send({
    id: session.id,
  });
};

export default handler;
