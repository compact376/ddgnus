import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4242;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:3000';

if (!stripeSecretKey) {
  console.warn('Stripe secret key is not configured. Set STRIPE_SECRET_KEY in .env to enable payments.');
}

const stripe = new Stripe(stripeSecretKey ?? '', {
  apiVersion: '2022-11-15',
});

const priceMap = {
  soul_body: process.env.STRIPE_PRICE_SOUL_BODY,
  deep_state: process.env.STRIPE_PRICE_DEEP_STATE,
  research: process.env.STRIPE_PRICE_RESEARCH,
  scouting: process.env.STRIPE_PRICE_SCOUTING,
  book_preorder: process.env.STRIPE_PRICE_BOOK_PREORDER,
};

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/create-checkout-session', async (req, res) => {
  const { item } = req.body as { item: keyof typeof priceMap };
  const priceId = item ? priceMap[item] : undefined;

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid checkout item. Configure valid Stripe price IDs in your .env file.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${clientUrl}/payments?success=true`,
      cancel_url: `${clientUrl}/payments?canceled=true`,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Unable to create Stripe checkout session.' });
  }
});

app.listen(port, () => {
  console.log(`Stripe checkout server running on http://localhost:${port}`);
});
