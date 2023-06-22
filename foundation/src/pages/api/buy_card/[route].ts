import { formatAmountForStripe } from "../../../utils/stripe_helpers";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from 'next';
const products = [
    {
        route:"javan_rhino",
        id:"prod_O73dHkI4KMAuPW"
    },
    {
        route:"sumatran_elephant",
        id:"prod_O73bKSPHPA2wrr"
    },
    {
        route:"nubian_giraffe",
        id:"prod_O73Zyr5xQFPFWQ"
    },
    {
        route:"pygmy_hippo",
        id:"prod_O73XXdVel3iBn3"
    },
    {
        route:"amur_leopard",
        id:"prod_O73W5jEHfhJs8d"
    },
    {
        route:"red_wolf",
        id:"prod_O73VRBT1RKoX7w"
    },
    {
        route:"siberian_tiger",
        id:"prod_O73Tsgv9psqHS3"
    }
]
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-11-15',
  })
  const { route } = req.query;
  const _product = products.find((product) => product.route === route);
  const cardId = process.env.NEXT_PUBLIC_ENV == 'Dev' ? 'prod_O76Ynu7J5bDEYy' : _product?.id;
  const product = await stripe.products.retrieve(String(cardId));
  const fee = await stripe.products.retrieve(String(process.env.NEXT_PUBLIC_FEE));

    const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card'],
        line_items: [
            {
              price: String(product.default_price),
              quantity: 1,
            },
            {
                price: String(fee.default_price),
                quantity: 1
            }
          ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_HOST}/animals/${route}?result=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/animals/${route}?result=cancelled`,
    };
    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
    );
    console.log(checkoutSession);
  res.send({
    id: checkoutSession.id
  });
};

export default handler;
