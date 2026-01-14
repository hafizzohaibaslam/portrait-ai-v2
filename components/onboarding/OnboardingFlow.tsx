"use client";

import StepPortraitForm from "./steps/StepPortraitForm";
import StepPortraitImage from "./steps/StepPortraitImage";
import StepProfileImage from "./steps/StepProfileImage";
import StepMemoryMedia from "./steps/StepMemoryMedia";
import StepMemoryContent from "./steps/StepMemoryContent";
import { useOnboardingFlow } from "@/hooks/onboarding/useOnboardingFlow";

type OnboardingFlowProps = {
  className?: string;
};

const OnboardingFlow = ({ className }: OnboardingFlowProps) => {
  const {
    state,
    goToNextStep,
    goToStep,
    skipToDashboard,
    updatePortraitForm,
    updatePortraitImage,
    updateProfileImage,
    updateMemoryFiles,
    updateMemoryForm,
    updateMemoryDescriptionType,
  } = useOnboardingFlow();

  const handlePortraitFormSubmit = (
    data: Parameters<typeof updatePortraitForm>[0]
  ) => {
    updatePortraitForm(data);
    // Skip portrait_image step if "your-own"
    if (data.relation_type === "your-own") {
      goToStep("profile_image");
    } else {
      goToNextStep();
    }
  };

  const handlePortraitImageNext = () => {
    goToNextStep();
  };

  const handleProfileImageNext = () => {
    // TODO: Trigger portrait creation API call
    goToNextStep();
  };

  const handleMemoryMediaNext = () => {
    // TODO: Trigger memory media upload API call
    goToNextStep();
  };

  const handleMemoryContentNext = () => {
    // TODO: Trigger memory content creation/update API call
    skipToDashboard();
  };

  const renderStep = () => {
    switch (state.step) {
      case "form":
        return (
          <StepPortraitForm
            formData={state.create}
            onNext={handlePortraitFormSubmit}
            onSkip={skipToDashboard}
            className="flex-1 px-5 py-10 md:px-10 pb-12 flex flex-col max-w-[580px] w-full mx-auto lg:mx-0 justify-center"
          />
        );
      case "portrait_image":
        return (
          <StepPortraitImage
            portraitImage={state.portraitImage}
            onChange={updatePortraitImage}
            onNext={handlePortraitImageNext}
            onSkip={goToNextStep}
            className="flex-1 px-5 py-10 md:px-10 pb-12 flex flex-col max-w-[580px] w-full mx-auto lg:mx-0 justify-center"
          />
        );
      case "profile_image":
        return (
          <StepProfileImage
            profileImage={state.profileImage}
            onChange={updateProfileImage}
            onNext={handleProfileImageNext}
            onSkip={handleProfileImageNext}
            className="flex-1 px-5 py-10 md:px-10 pb-12 flex flex-col max-w-[580px] w-full mx-auto lg:mx-0 justify-center"
          />
        );
      case "memory_media":
        return (
          <StepMemoryMedia
            memoryFiles={state.memoryFiles || []}
            onChange={updateMemoryFiles}
            onNext={handleMemoryMediaNext}
            onSkip={goToNextStep}
            className="flex-1 px-5 py-10 md:px-10 pb-12 flex flex-col max-w-[580px] w-full mx-auto lg:mx-0 justify-center"
          />
        );
      case "memory_content":
        return (
          <StepMemoryContent
            memoryForm={state.memoryForm}
            descriptionType={state.memoryDescriptionType}
            onChange={updateMemoryForm}
            onDescriptionTypeChange={updateMemoryDescriptionType}
            onNext={handleMemoryContentNext}
            onSkip={skipToDashboard}
            className="flex-1 px-5 py-10 md:px-10 pb-12 flex flex-col max-w-[580px] w-full mx-auto lg:mx-0 justify-center"
          />
        );
      default:
        return null;
    }
  };

  return <div className={className}>{renderStep()}</div>;
};

export default OnboardingFlow;
