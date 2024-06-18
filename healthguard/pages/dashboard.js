import LandingLayout from "@/components/landingPage/landingLayout";
import LandingHeader from "@/components/landingPage/landingHeader";
import SEO from "@/components/additional/seo";
import DashboardHero from "@/components/dashboard/DashboardHero";
import FeedDataCard from "@/components/aiComponent/feedDataCard";
import Chatbot from "@/components/aiComponent/chatbot";
import Room from "@/components/dashboard/Room";
import DashBoard from "@/components/dashboard/DashBoard";

export default function Dashboard() {
  return (
    <>
      <LandingLayout>
        <SEO />
        <LandingHeader />
        <main className="space-y-40 mb-0">
          <DashBoard />
        </main>
      </LandingLayout>
    </>
  );
}
