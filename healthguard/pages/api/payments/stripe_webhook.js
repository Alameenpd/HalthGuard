export const config = {
  api: {
    bodyParser: false,
  },
};

import getRawBody from "raw-body";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

// Use default export to define the API route
export default async function handler(req, res) {
  try {
    console.log("inside");
    const buf = await getRawBody(req);

    const sig = req.headers["stripe-signature"];
    console.log(sig);

    let event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      console.log(event.data.object.customer_details.email);
      if (!event.data.object.customer_details.email) {
        throw new Error(`missing user email, ${event.id}`);
      }
    }

    return res.status(200).json({ result: event, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
      ok: false,
    });
  }
}
