import { formatAmountForStripe } from "../../../utils/stripe_helpers";
import cookie from "cookie";
import initStripe from "stripe";

const handler = async (req, res) => {
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
  
  const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  const product_name = "donate_" + new Date().valueOf();
  console.log(product_name);
  const product = await stripe.products.create({
    name: product_name,
    description: 'Donation',
  });
  console.log(product.id);
  const { amount } = req.query;
  const price = await stripe.prices.create({
    unit_amount: formatAmountForStripe(amount,'usd'),
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