import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import TrendingTopics from "./components/TrendingTopics";
import FeaturesGrid from "./components/FeaturesGrid";
import LiveRoomsBar from "./components/LiveRoomsBar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-[#e68200] selection:text-white overflow-x-hidden">
      <LandingNavbar />
      <HeroSection />
      <TrendingTopics />
      <FeaturesGrid />
      <LiveRoomsBar />
    </div>
  );
};

export default Landing;
