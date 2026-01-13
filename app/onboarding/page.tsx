"use client";
import AppBrand from "@/components/shared/AppBrand";
import OnboardPortraitForm from "@/components/onboarding-page/OnboardPortraitForm";
import CreateSlideShow from "@/components/onboarding-page/CreateSlideShow";
import { cn } from "@/lib/utils";

type OnboardingPageProps = { className?: string };
const OnboardingPage = (props: OnboardingPageProps) => {
  return (
    <div className={cn("bg-purple-4 min-h-screen", props.className)}>
      <div className="bg-purple-4 sticky top-0 z-1 justify-center lg:justify-start p-5 lg:px-12 lg:py-6 flex items-center border-b-2 border-b-gray-1 lg:border-none">
        <AppBrand />
      </div>

      <div className="flex lg:px-20 justify-between">
        <OnboardPortraitForm
          onSubmit={() => {}}
          onSkip={() => {}}
          className="flex-1 px-5 py-10 md:px-10 pb-12 flex flex-col max-w-[580px] w-full mx-auto lg:mx-0 justify-center"
        />
        <CreateSlideShow className="sticky top-0 hidden lg:block max-w-[500px] xl:max-w-[600px] 2xl:max-w-[680px] w-full h-full p-4" />
      </div>
    </div>
  );
};

export default OnboardingPage;
