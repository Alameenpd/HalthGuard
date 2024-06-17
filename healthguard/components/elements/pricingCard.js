import React from "react";
import Button from "./button";
import { stripeCheckout } from "@/lib/stripe-checkout";
import { useEffect } from "react";

export default function PricingCard({ tier }) {
  useEffect(() => {
    if (tier.paymentProvider == "LemonSqueezy") {
      const scriptSrcToCheck = "https://assets.lemonsqueezy.com/lemon.js";
      const existingScript = document.querySelector(
        `script[src="${scriptSrcToCheck}"]`
      );

      if (!existingScript) {
        // The script has not been included, so add it
        const scriptElement = document.createElement("script");
        scriptElement.src = scriptSrcToCheck;
        scriptElement.defer = true;
        document.body.appendChild(scriptElement);
      }
    }
  }, [tier.paymentProvider]);

  return (
    <>
      <div className="flex flex-col items-center aspect-auto p-4 sm:p-8 border rounded-3xl bg-white dark:bg-gray-800 border-gray-700 shadow-gray-600/10 shadow-none m-2 flex-1 max-w-md">
        <h2 className="text-lg sm:text-xl font-medium text-gray-700 dark:text-white mb-2">
          {tier.title}
        </h2>
        <p className="text-lg sm:text-xl text-center mb-8 mt-4">
          <span className="text-3xl sm:text-4xl font-bold text-gray-700 dark:text-white">
            {tier.price}
          </span>{" "}
          / Month
        </p>
        <ul className="list-none list-inside mb-6 text-center">
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className={index === 0 ? "font-bold text-primary" : ""}
            >
              {feature}
            </li>
          ))}
        </ul>
        {tier.paymentProvider == "LemonSqueezy" ? (
          <Button
            link={tier.lemonSqueezy.buyLink}
            text="Purchase Plan"
            type="primary"
            customClass="lemonsqueezy-button"
          />
        ) : (
          <Button
            onClickEvent={() =>
              stripeCheckout({
                lineItems: tier.stripe.lineItems,
              })
            }
            text="Purchase Plan"
            type="primary"
          />
        )}
      </div>
    </>
  );
}
