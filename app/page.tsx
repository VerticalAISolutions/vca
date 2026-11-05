import LandscapeScroll from "./LandscapeScroll";
import PartnerSection from "./components/PartnerSection";
import SiteNav from "./components/SiteNav";

export default function Home() {
  return (
    <main id="top" className="w-full overflow-x-clip bg-forest">
      <h1 className="sr-only">THE GARDENERS: bring back what brings life.</h1>
      <SiteNav />
      <LandscapeScroll />
      <PartnerSection />
    </main>
  );
}
