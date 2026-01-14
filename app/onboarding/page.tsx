"use client";
import AppBrand from "@/components/shared/AppBrand";
import CreateSlideShow from "@/components/onboarding/slideshow/CreateSlideShow";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { cn } from "@/lib/utils";

type OnboardingPageProps = { className?: string };
const OnboardingPage = (props: OnboardingPageProps) => {
  return (
    <div className={cn("bg-purple-4 min-h-screen", props.className)}>
      <div className="bg-purple-4 sticky top-0 z-1 justify-center lg:justify-start p-5 lg:px-12 lg:py-6 flex items-center border-b-2 border-b-gray-1 lg:border-none">
        <AppBrand />
      </div>

      <div className="flex lg:px-20 justify-between">
        <OnboardingFlow />
        <CreateSlideShow className="sticky top-0 hidden lg:block max-w-[500px] xl:max-w-[600px] 2xl:max-w-[680px] w-full h-full p-4" />
      </div>
    </div>
  );
};

export default OnboardingPage;
