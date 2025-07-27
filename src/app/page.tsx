import HeroSection from "@/components/home/hero";
import AboutDeepfake from "@/components/home/about-deepfake";
import ThreatCarousel from "@/components/home/threat-carousel";
import RealCasesSection from "@/components/home/real-cases";
import ProtectionSection from "@/components/home/protection";
import CTASection from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutDeepfake />
      <ThreatCarousel />
      <RealCasesSection />
      <ProtectionSection />
      <CTASection />
    </>
  );
}
