import HomeHero from "@/ui/HomeHero";
import SectionAchievement from "@/ui/SectionAchievement";
import SectionPartners from "@/ui/SectionPartners";
import SectionTestimonial from "@/ui/SectionTestimonial";
import SectionWhyUs from "@/ui/SectionWhyUs";
import ServicesSection from "@/ui/ServicesSection";
import TrackAndTraceSection from "@/ui/TrackAndTraceSection";
import SectionCTA from "@/ui/SectionCTA";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrackAndTraceSection />
      <ServicesSection />
      <SectionWhyUs />
      <SectionAchievement />
      <SectionTestimonial/>
      <SectionPartners />
      <SectionCTA />
    </>
  );
}
