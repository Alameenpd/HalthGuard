import LandingLayout from "@/components/landingPage/landingLayout";
import LandingHeader from "@/components/landingPage/landingHeader";
import LandingFeature from "@/components/landingPage/landingFeature";
import LandingHero from "@/components/landingPage/landingHero";
import LandingFooter from "@/components/landingPage/landingFooter";
import LandingCta from "@/components/landingPage/landingCta";
import { useEffect } from "react";
import SEO from "@/components/additional/seo";

export default function Feature() {
  useEffect(() => {
    const pricingElement = document.getElementById("features");
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <>
      <LandingLayout>
        <SEO />
        <LandingHeader isDashboard={true} from="index" navLinkEnable={true} />
        <main className="space-y-20 mb-0">
          <LandingHero />
          <LandingFeature />
          <LandingCta />
        </main>
        <LandingFooter />
      </LandingLayout>
    </>
  );
}
