import React from "react";
import LandingContainer from "./landingContainer";
import { useSession, signIn, signOut } from "next-auth/react";
import pricingTiers from "@/config/pricingSet";
import PricingCard from "../elements/pricingCard";

const LandingPricing = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  return (
    <>
      <div className="relative text-gray-300" id="pricing">
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400  to-indigo-600"></div>
        </div>
        <LandingContainer>
          <div className="mb-10 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-2xl font-bold text-gray-700 dark:text-white sm:text-3xl md:text-4xl">
              Pricing
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {pricingTiers.map((tier, index) => (
              <PricingCard
                tier={tier}
                key={index}
              />
            ))}
          </div>
        </LandingContainer>
      </div>
    </>
  );
};

export default LandingPricing;
