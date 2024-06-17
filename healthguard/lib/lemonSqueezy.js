//LemonSqueezy Library

import { v4 as uuidv4 } from "uuid";
import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js";

const LemonSqueezyClient = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY);

const LicenseKeyOps = {
  validateLicenseKey: async (licenseKey) => {
    const apiUrl = "https://api.lemonsqueezy.com/v1/licenses/validate";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `license_key=${licenseKey}`,
      });
      const data = await response.json();

      if (data.valid) {
        const storeId = "YOUR_STORE_ID"; //replace with your store id
        if (
          data.meta.store_id == storeId &&
          data.license_key.activation_usage == 1
        ) {
          return { isValid: true };
        } else {
          return { isValid: false };
        }
      } else {
        return { isValid: false };
      }
    } catch (error) {
      return { isValid: false };
    }
  },

  activeLicenseKey: async (licenseKey) => {
    const apiUrl = "https://api.lemonsqueezy.com/v1/licenses/activate";
    try {
      const body = new URLSearchParams({
        license_key: licenseKey,
        instance_name: uuidv4(),
      });
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: body,
      });
      const data = await response.json();

      if (data.activated) {
        return { isActivated: true };
      } else {
        return { isActivated: false, error: data.error };
      }
    } catch (error) {
      return { isActivated: false };
    }
  },
};

const SubscriptionOps = {
  createCheckout: async (userEmail, storeId, productId) => {
    const variant = (
      await ls.getVariants({
        productId: productId,
        perPage: 5,
        include: "product",
      })
    )[0];

    let attributes = {
      checkout_data: {
        email: "user@gmail.com",
        custom: {
          user_id: userEmail,
        },
      },
      product_options: {
        redirect_url: "https://customredirect.com",
      },
      checkout_options: {
        dark: true,
        logo: false,
      },
    };

    const checkout = await LemonSqueezyClient.createCheckout({
      storeId: storeId,
      variantId: variant.id,
      attributes,
    });

    return checkout;
  },

  checkSubscription: async (userEmail, storeId, variantId, subcriptionId) => {
    const subscription = await LemonSqueezyClient.getSubscription({
      id: subcriptionId,
    });

    const userEmailFromSubcription = payload.data.attributes.user_email;
    const variantIdFromSubcription = subscription.data.attributes.variant_id;
    const endsAtFromSubcription = subscription.data.attributes.ends_at;

    if (
      userEmail != userEmailFromSubcription ||
      variantId != variantIdFromSubcription
    ) {
      return {
        msg: "invalid subcription",
      };
    }

    const endAt = new Date(endsAtFromSubcription);
    const now = new Date();

    if (now > endAt) {
      return {
        msg: "subscription ended",
      };
    } else {
      return {
        msg: "subscription is active",
      };
    }
  },
};

export default { LemonSqueezyFunctions, LemonSqueezyClient, SubscriptionOps };
