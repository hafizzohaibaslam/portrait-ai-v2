import LandingHeader from "@/components/features/landing-page/LandingHeader";
import LandingHeaderTitle from "@/components/features/landing-page/LandingHeaderTitle";
import LandingUseCases from "@/components/features/landing-page/LandingUseCases";
import LandingPreHero from "@/components/features/landing-page/LandingPreHero";
import LandingSecuritySection from "@/components/features/landing-page/LandingSecuritySection";
import LandingHero from "@/components/features/landing-page/LandingHero";
import LandingGetInTouch from "@/components/features/landing-page/LandingGetInTouch";
import LandingTestimonials from "@/components/features/landing-page/LandingTestimonials";
import LandingFooter from "@/components/features/landing-page/LandingFooter";

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
