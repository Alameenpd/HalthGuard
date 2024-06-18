import LandingLayout from "@/components/landingPage/landingLayout";
import LandingHeader from "@/components/landingPage/landingHeader";
import SEO from "@/components/additional/seo";
import DashboardHero from "@/components/dashboard/DashboardHero";
import FeedDataCard from "@/components/aiComponent/feedDataCard";
import Chatbot from "@/components/aiComponent/chatbot";
<<<<<<< HEAD
import Room from "@/components/dashboard/Room";
import DashBoard from "@/components/dashboard/DashBoard";
=======
>>>>>>> refs/remotes/origin/main

export default function Dashboard() {
  return (
    <>
      <LandingLayout>
        <SEO />
        <LandingHeader />
        <main className="space-y-40 mb-0">
<<<<<<< HEAD
          <DashBoard />
=======
          <DashboardHero />
          <FeedDataCard />
          <Chatbot />
>>>>>>> refs/remotes/origin/main
        </main>
      </LandingLayout>
    </>
  );
}
