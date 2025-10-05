import HeroSection from "@/components/home/hero";
import AboutDeepfake from "@/components/home/about-deepfake";
import ThreatCarousel from "@/components/home/threat-carousel";
import RealCasesSection from "@/components/home/real-cases";
import ProtectionSection from "@/components/home/protection";
import CTASection from "@/components/home/cta";
import HomePageHeader from "@/components/home/home-page-header";
import Footer from "@/components/global/footer";
import TabComponent from "@/components/home/tab-component";
// import ImageDeepfakeChecker from "@/components/home/check-deepfake";
// import CheckUrl from "@/components/home/check-url";
// import CheckEmailStatus from "@/components/home/check-email";

export default function Home() {
  return (
    <>
      <div className="px-4 md:px-0">
        <HomePageHeader />
        <HeroSection />
        <AboutDeepfake />

        <TabComponent />

        {/* <ImageDeepfakeChecker />
        <CheckUrl />
        <CheckEmailStatus /> */}
        <ThreatCarousel />
        <RealCasesSection />
        <ProtectionSection />
        <CTASection />
      </div>
      <Footer />
    </>
  );
}
