import LandingHeader from "@/components/landing-page/LandingHeader";
import LandingHeaderTitle from "@/components/landing-page/LandingHeaderTitle";
import LandingUseCases from "@/components/landing-page/LandingUseCases";
import LandingPreHero from "@/components/landing-page/LandingPreHero";
import LandingSecuritySection from "@/components/landing-page/LandingSecuritySection";
import LandingHero from "@/components/landing-page/LandingHero";
import LandingGetInTouch from "@/components/landing-page/LandingGetInTouch";
import LandingTestimonials from "@/components/landing-page/LandingTestimonials";
import LandingFooter from "@/components/landing-page/LandingFooter";

export default function LandingPage() {
  return (
    <div className="bg-yellow-4 h-full flex flex-col">
      <LandingHeader />
      <LandingHeaderTitle />
      <LandingUseCases />
      <LandingPreHero />
      <LandingSecuritySection />
      <LandingHero />
      <LandingGetInTouch />
      <LandingTestimonials />
      <LandingFooter />
    </div>
  );
}
