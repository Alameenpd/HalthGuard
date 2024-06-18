import LandingLayout from "@/components/landingPage/landingLayout";
import LandingHeader from "@/components/landingPage/landingHeader";
import LandingFeature from "@/components/landingPage/landingFeature";
import LandingHero from "@/components/landingPage/landingHero";
import LandingPricing from "@/components/landingPage/landingPricing";
import LandingFooter from "@/components/landingPage/landingFooter";
import LandingCta from "@/components/landingPage/landingCta";
import { useTheme } from "next-themes";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  setTheme("light");

  return (
    <>
      <LandingLayout>
        <LandingHeader />
        <main className="space-y-40 mb-0">
          <LandingHero />
          <LandingFeature />
          <LandingPricing/>
          <LandingCta />
        </main>
        <LandingFooter />
      </LandingLayout>
    </>
  );
}
