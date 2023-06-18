import { NextApiRequest, NextApiResponse } from 'next'
import { formatAmountForStripe } from '../../../utils/stripe_helpers'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2019-12-03',
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const amount: number = req.body.amount;
    console.log("amount:",amount);
    try {
      
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Amount donation',
            amount: formatAmountForStripe(amount, 'usd'),
            currency: 'usd',
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/donation?result=success`,
        cancel_url: `${req.headers.origin}/donation?result=cancelled`,
      }
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      )

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}