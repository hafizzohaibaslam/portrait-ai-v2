"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import StepPortraitForm from "./steps/StepPortraitForm";
import StepPortraitImage from "./steps/StepPortraitImage";
import StepProfileImage from "./steps/StepProfileImage";
import StepMemoryMedia from "./steps/StepMemoryMedia";
import StepMemoryContent from "./steps/StepMemoryContent";
import { useOnboardingFlow } from "@/hooks/onboarding/useOnboardingFlow";
import { useCreatePortraitMutation } from "@/hooks/onboarding/useCreatePortraitMutation";
import { useCreateMemoryMutation } from "@/hooks/onboarding/useCreateMemoryMutation";
import { useUpdateMemoryMutation } from "@/hooks/onboarding/useUpdateMemoryMutation";
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
    updateMemoryFiles,
    updateMemoryForm,
    updateMemoryDescriptionType,
    setPortrait,
    setMemoryId,
  } = useOnboardingFlow();

  const createPortraitMutation = useCreatePortraitMutation();
  const createMemoryMutation = useCreateMemoryMutation();
  const updateMemoryMutation = useUpdateMemoryMutation();

  // Refs to prevent duplicate navigation
  const portraitCreatedRef = useRef(false);
  const memoryMediaCreatedRef = useRef(false);
  const memoryContentProcessedRef = useRef(false);

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

  const handleMemoryMediaNext = () => {
    if (
      !state.portraitId ||
      !state.memoryFiles ||
      state.memoryFiles.length === 0
    ) {
      goToNextStep();
      return;
    }

    // Create memory with first file
    const firstFile = state.memoryFiles[0];
    createMemoryMutation.mutate({
      portrait_id: state.portraitId,
      title: "Untitled Memory",
      media_file: firstFile,
    });
  };

  const handleMemoryContentNext = () => {
    if (!state.portraitId || !state.memoryForm?.title) return;

    const title = state.memoryForm.title.trim();
    const description = state.memoryForm.description?.trim();

    if (state.memoryId) {
      // Update existing memory
      updateMemoryMutation.mutate({
        memoryId: state.memoryId,
        payload: {
          title,
          description: description || undefined,
        },
      });
    } else {
      // Create new memory
      createMemoryMutation.mutate({
        portrait_id: state.portraitId,
        title,
        description: description || undefined,
        media_file: state.memoryForm.recording || undefined,
      });
    }
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

  // Handle memory creation success (from media upload)
  useEffect(() => {
    if (
      createMemoryMutation.isSuccess &&
      createMemoryMutation.data &&
      state.step === "memory_media" &&
      !memoryMediaCreatedRef.current
    ) {
      const memoryId = createMemoryMutation.data.memory?.memory_id;
      if (memoryId) {
        memoryMediaCreatedRef.current = true;
        toast.success("Memory media uploaded successfully");
        setMemoryId(memoryId);
        goToNextStep();
      }
    }
  }, [
    createMemoryMutation.isSuccess,
    createMemoryMutation.data,
    state.step,
    setMemoryId,
    goToNextStep,
  ]);

  // Handle memory creation/update success (from content step)
  useEffect(() => {
    if (state.step === "memory_content" && !memoryContentProcessedRef.current) {
      // Check if update mutation succeeded (memory was created from media upload)
      if (updateMemoryMutation.isSuccess && state.memoryId) {
        memoryContentProcessedRef.current = true;
        toast.success("Memory content updated successfully");
        skipToDashboard();
      }
      // Check if create mutation succeeded (new memory from content step)
      // Only trigger if memoryId doesn't exist (meaning it's a new memory, not from media upload)
      else if (createMemoryMutation.isSuccess && !state.memoryId) {
        memoryContentProcessedRef.current = true;
        toast.success("Memory content created successfully");
        skipToDashboard();
      }
    }
  }, [
    createMemoryMutation.isSuccess,
    updateMemoryMutation.isSuccess,
    state.step,
    state.memoryId,
    skipToDashboard,
  ]);

  // Reset refs when step changes
  useEffect(() => {
    if (state.step === "profile_image") {
      portraitCreatedRef.current = false;
    }
    if (state.step === "memory_content") {
      memoryContentProcessedRef.current = false;
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
            isLoading={createPortraitMutation.isPending}
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
            isLoading={createMemoryMutation.isPending}
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
            isLoading={
              createMemoryMutation.isPending || updateMemoryMutation.isPending
            }
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
