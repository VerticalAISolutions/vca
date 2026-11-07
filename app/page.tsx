import LandscapeScroll from "./LandscapeScroll";
import FounderSection from "./components/FounderSection";
import MissionSection from "./components/MissionSection";
import PartnerSection from "./components/PartnerSection";
import Preloader from "./components/Preloader";
import SiteNav from "./components/SiteNav";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <main id="top" className="w-full overflow-x-clip bg-forest">
      <h1 className="sr-only">THE GARDENERS: bring back what brings life.</h1>
      <Preloader />
      <SiteNav />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SmoothScroll />
          <LandscapeScroll />
          <MissionSection />
          <FounderSection />
          <PartnerSection />
        </div>
      </div>
    </main>
  );
}
