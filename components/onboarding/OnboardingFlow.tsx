"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import StepPortraitForm from "./steps/StepPortraitForm";
import StepPortraitImage from "./steps/StepPortraitImage";
import StepProfileImage from "./steps/StepProfileImage";
import OnboardMemoriesDialog from "@/components/portraits/OnboardMemoriesDialog";
import { useOnboardingFlow } from "@/hooks/onboarding/useOnboardingFlow";
import { useCreatePortraitMutation } from "@/hooks/onboarding/useCreatePortraitMutation";
import { useCreateMemoryMutation } from "@/hooks/onboarding/useCreateMemoryMutation";
import type { CreatePortraitPayload } from "@/types/portrait-types";

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
    setPortrait,
  } = useOnboardingFlow();

  const createPortraitMutation = useCreatePortraitMutation();
  const createMemoryMutation = useCreateMemoryMutation();

  // Refs to prevent duplicate navigation
  const portraitCreatedRef = useRef(false);
  const memoryCreatedRef = useRef(false);

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
    if (!state.create) return;

    // Prepare payload based on relation type
    const payload: CreatePortraitPayload =
      state.create.relation_type === "your-own"
        ? {
            ...state.create,
            relation_type: "your-own",
            portrait_image: null,
            profile_image: state.profileImage || null,
          }
        : {
            ...state.create,
            relation_type: state.create.relation_type,
            portrait_image: state.portraitImage || null,
            profile_image: state.profileImage || null,
          };

    createPortraitMutation.mutate(payload);
  };

  // Handle portrait creation success
  useEffect(() => {
    if (
      createPortraitMutation.isSuccess &&
      createPortraitMutation.data &&
      !portraitCreatedRef.current
    ) {
      const response = createPortraitMutation.data;
      const portrait = response.portrait;
      const portraitId = portrait?.portrait_id;

      if (portraitId && portrait) {
        portraitCreatedRef.current = true;
        toast.success("Portrait created successfully");
        setPortrait(portrait, portraitId);
        goToNextStep();
      }
    }
  }, [
    createPortraitMutation.isSuccess,
    createPortraitMutation.data,
    setPortrait,
    goToNextStep,
  ]);

  // Handle memory creation success
  useEffect(() => {
    if (
      createMemoryMutation.isSuccess &&
      createMemoryMutation.data &&
      state.step === "memory" &&
      !memoryCreatedRef.current
    ) {
      memoryCreatedRef.current = true;
      toast.success("Memory created successfully");
      skipToDashboard();
    }
  }, [
    createMemoryMutation.isSuccess,
    createMemoryMutation.data,
    state.step,
    skipToDashboard,
  ]);

  // Reset refs when step changes
  useEffect(() => {
    if (state.step === "profile_image") {
      portraitCreatedRef.current = false;
    }
    if (state.step === "memory") {
      memoryCreatedRef.current = false;
    }
  }, [state.step]);

  const renderStep = () => {
    switch (state.step) {
      case "form":
        return (
          <StepPortraitForm
            formData={state.create}
            onNext={handlePortraitFormSubmit}
            onSkip={skipToDashboard}
            className="flex-1 flex flex-col w-full max-w-[500px] mx-auto justify-center"
          />
        );
      case "portrait_image":
        return (
          <StepPortraitImage
            portraitImage={state.portraitImage}
            onChange={updatePortraitImage}
            onNext={handlePortraitImageNext}
            onSkip={goToNextStep}
            className="flex-1 flex flex-col w-full max-w-[500px] mx-auto justify-center"
          />
        );
      case "profile_image":
        return (
          <StepProfileImage
            profileImage={state.profileImage}
            onChange={updateProfileImage}
            onNext={handleProfileImageNext}
            onSkip={handleProfileImageNext}
            isLoading={createPortraitMutation.isPending}
            className="flex-1 flex flex-col w-full max-w-[500px] mx-auto justify-center"
          />
        );
      case "memory":
        if (!state.portrait) {
          // Portrait not created yet, go back to form
          goToStep("form");
          return null;
        }
        return (
          <div className="flex-1 flex flex-col w-full max-w-[500px] mx-auto justify-center">
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="font-normal text-[32px] leading-[40px] tracking-[-3%] text-off-black">
                  Add memories to your portrait
                </h1>
                <p className="font-light text-[18px] leading-[28px] tracking-[-3%] text-off-gray">
                  Enrich this portrait with images, videos, and more. You can come back to add more later or share with others to contribute.
                </p>
              </div>
              <div className="space-y-6">
                <OnboardMemoriesDialog
                  portrait={state.portrait}
                  onComplete={skipToDashboard}
                />
                <button
                  onClick={skipToDashboard}
                  className="block text-[16px] font-normal leading-5 tracking-wide text-center text-[#8D8D8D] hover:underline w-full cursor-pointer"
                  type="button"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className={className}>{renderStep()}</div>;
};

export default OnboardingFlow;
