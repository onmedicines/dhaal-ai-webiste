import HeroSection from "@/components/home/hero";
import AboutDeepfake from "@/components/home/about-deepfake";
import ThreatCarousel from "@/components/home/threat-carousel";
import RealCasesSection from "@/components/home/real-cases";
import ProtectionSection from "@/components/home/protection";
import CTASection from "@/components/home/cta";
import HomePageHeader from "@/components/home/home-page-header";
// import RealCasesSectionMobile from "@/components/home/real-cases-mobile";
import Footer from "@/components/global/footer";

export default function Home() {
  return (
    <>
      <div className="px-4 md:px-0">
        <HomePageHeader />
        <HeroSection />
        <AboutDeepfake />
        <ThreatCarousel />
        {/*<div className="hidden md:block">*/}
        <RealCasesSection />
        {/*</div>*/}
        {/*<div className="md:hidden">
          <RealCasesSectionMobile />
        </div>*/}
        <ProtectionSection />
        <CTASection />
      </div>
      <Footer />
    </>
  );
}
