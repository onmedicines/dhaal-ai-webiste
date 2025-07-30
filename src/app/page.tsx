import HeroSection from "@/components/home/hero";
import AboutDeepfake from "@/components/home/about-deepfake";
import ThreatCarousel from "@/components/home/threat-carousel";
import RealCasesSection from "@/components/home/real-cases";
import ProtectionSection from "@/components/home/protection";
import CTASection from "@/components/home/cta";
import HomePageHeader from "@/components/home/home-page-header";
import Footer from "@/components/global/footer";

export default function Home() {
  return (
    <>
      <HomePageHeader />
      <HeroSection />
      <AboutDeepfake />
      <ThreatCarousel />
      <RealCasesSection />
      <ProtectionSection />
      <CTASection />
      <Footer />
    </>
  );
}
