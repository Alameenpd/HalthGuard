const pricingTiers = [
  {
    title: "Basic",
    price: "$9",
    features: [
      "Access to Injuy Dectection",
      "Verbal Instructions",
      "Emergency Service Contact",
      "Limited Access to Medical Expert Team",
    ],
    paymentProvider: "LemonSqueezy",
    lemonSqueezy: {
      buyLink:
        "https://xpage.lemonsqueezy.com/checkout/buy/cc173c6e-d80a-4a50-a107-0afd31bddcc4?embed=1",
    },
    stripe: {},
  },
  {
    title: "Premium",
    price: "$19",
    features: [
      "Video Integration",
      "Emergency Service Contact",
      "Progress Tracking",
      "First Aid Guidiance for Common Injuries",
    ],
    paymentProvider: "Stripe",
    lemonSqueezy: {},
    stripe: {
      lineItems: [
        {
          price: "price_1NpX7gSJLMp4nJYnw5XrCMwR",
          quantity: 1,
        },
      ],
    },
  },
];

export default pricingTiers;
