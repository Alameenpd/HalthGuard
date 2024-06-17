import LandingLayout from "@/components/landingPage/landingLayout";
import LandingHeader from "@/components/landingPage/landingHeader";
import SEO from "@/components/additional/seo";
import DashboardHero from "@/components/dashboard/DashboardHero";
import FeedDataCard from "@/components/aiComponent/feedDataCard";
import Chatbot from "@/components/aiComponent/chatbot";
import Room from "@/components/dashboard/Room";

export default function Dashboard() {
  return (
    <>
      <LandingLayout>
        <SEO />
        <LandingHeader />
        <main className="space-y-40 mb-0">
          <DashboardHero />
          <Room />
          <FeedDataCard />
          <Chatbot />
        </main>
      </LandingLayout>
    </>
  );
}
