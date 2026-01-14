"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  OnboardStep,
  OnboardState,
  MemoryDescriptionType,
  MemoryFormData,
} from "@/types/onboarding";
import type {
  CreatePortraitPayloadBase,
  Portrait,
} from "@/types/portrait-types";

const STEPS: OnboardStep[] = [
  "form",
  "portrait_image",
  "profile_image",
  "memory_media",
  "memory_content",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const useOnboardingFlow = () => {
  const router = useRouter();
  const [state, setState] = useState<OnboardState>({
    step: "form",
    memoryDescriptionType: "note",
  });

  const updateState = useCallback((updates: Partial<OnboardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const goToNextStep = useCallback(() => {
    if (!state.step) return;

    const currentIndex = STEPS.indexOf(state.step);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1];
      setState((prev) => ({ ...prev, step: nextStep }));
    }
  }, [state.step]);

  const goToStep = useCallback((step: OnboardStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const skipToDashboard = useCallback(() => {
    router.push("/dashboard/portraits");
  }, [router]);

  const updatePortraitForm = useCallback(
    (data: Partial<CreatePortraitPayloadBase>) => {
      setState((prev) => ({
        ...prev,
        create: { ...prev.create, ...data } as CreatePortraitPayloadBase,
        validated: true,
      }));
    },
    []
  );

  const updatePortraitImage = useCallback((file: File | undefined) => {
    setState((prev) => ({ ...prev, portraitImage: file }));
  }, []);

  const updateProfileImage = useCallback((file: File | undefined) => {
    setState((prev) => ({ ...prev, profileImage: file }));
  }, []);

  const updateMemoryFiles = useCallback((files: File[]) => {
    setState((prev) => ({ ...prev, memoryFiles: files }));
  }, []);

  const updateMemoryForm = useCallback((data: Partial<MemoryFormData>) => {
    setState((prev) => ({
      ...prev,
      memoryForm: { ...prev.memoryForm, ...data } as MemoryFormData,
      memoryValidated: !!data.title,
    }));
  }, []);

  const updateMemoryDescriptionType = useCallback(
    (type: MemoryDescriptionType) => {
      setState((prev) => ({ ...prev, memoryDescriptionType: type }));
    },
    []
  );

  const setPortrait = useCallback((portrait: Portrait, portraitId: string) => {
    setState((prev) => ({
      ...prev,
      portrait,
      portraitId,
    }));
  }, []);

  const setMemoryId = useCallback((memoryId: string) => {
    setState((prev) => ({ ...prev, memoryId }));
  }, []);

  const isYourOwn = state.create?.relation_type === "your-own";

  return {
    state,
    updateState,
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
    isYourOwn,
  };
};
