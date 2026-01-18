"use client";
import AppBrand from "@/components/shared/AppBrand";
import CreateSlideShow from "@/components/onboarding/slideshow/CreateSlideShow";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { cn } from "@/lib/utils";

type OnboardingPageProps = { className?: string };
const OnboardingPage = (props: OnboardingPageProps) => {
  return (
    <div className={cn("bg-purple-4 min-h-screen py-8 px-10", props.className)}>
      <AppBrand />
      <div className="mt-10 lg:mt-[60px] w-full flex justify-between items-center gap-10">
        <OnboardingFlow className="flex-1 flex flex-col items-center justify-center" />
        <CreateSlideShow className="hidden lg:flex-1 lg:flex lg:flex-col lg:w-full lg:max-w-[712px] lg:h-full" />
      </div>
    </div>
  );
};

export default OnboardingPage;
