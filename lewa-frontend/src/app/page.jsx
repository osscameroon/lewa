import CTASection from "@/components/cta";
import FeatureSection from "@/components/features";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero";
import LanguageSection from "@/components/languages";
import NavigationBar from "@/components/navigation";
import WhySection from "@/components/why";


export default function Home() {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <WhySection />
      <FeatureSection />
      <LanguageSection />
      <CTASection />
      <FooterSection />
    </>
  )
}