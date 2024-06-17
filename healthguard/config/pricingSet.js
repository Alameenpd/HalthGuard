const pricingTiers = [
  {
    title: "LemonSqueezy Payment",
    price: "$9",
    features: [
      "Our Awesome Feature 1",
      "Our Awesome Feature 2",
      "Our Awesome Feature 3",
      "Our Awesome Feature 4",
      "Our Awesome Feature 5",
      "Our Awesome Feature 6",
    ],
    paymentProvider: "LemonSqueezy",
    lemonSqueezy: {
      buyLink:
        "https://xpage.lemonsqueezy.com/checkout/buy/cc173c6e-d80a-4a50-a107-0afd31bddcc4?embed=1",
    },
    stripe: {},
  },
  {
    title: "Stripe Payment",
    price: "$19",
    features: [
      "Our Awesome Feature 1",
      "Our Awesome Feature 2",
      "Our Awesome Feature 3",
      "Our Awesome Feature 4",
      "Our Awesome Feature 5",
      "Our Awesome Feature 6",
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
