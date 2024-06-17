import LandingLayout from "@/components/landingPage/landingLayout";
import LandingHeader from "@/components/landingPage/landingHeader";
import LandingHero from "@/components/landingPage/landingHero";
import LandingPricing from "@/components/landingPage/landingPricing";
import LandingFooter from "@/components/landingPage/landingFooter";
import LandingCta from "@/components/landingPage/landingCta";
import { useEffect } from "react";
import SEO from "@/components/additional/seo";

export default function Pricing() {
  useEffect(() => {
    const pricingElement = document.getElementById("pricing");
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <>
      <LandingLayout>
        <SEO />
        <LandingHeader />
        <main className="space-y-20 mb-0">
          <LandingHero />
          <LandingPricing />
          <LandingCta />
        </main>
        <LandingFooter />
      </LandingLayout>
    </>
  );
}
