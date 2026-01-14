"use client";

import { useState, useCallback } from "react";
import type {
  CreatePortraitStep,
  CreatePortraitFlowState,
} from "@/types/create-portrait-flow";
import type { Portrait } from "@/types/portrait-types";

const INITIAL_STEP: CreatePortraitStep = "choose_process";
const INITIAL_STATE: CreatePortraitFlowState = {
  step: INITIAL_STEP,
  portrait: null,
  memoryId: null,
  remainingFiles: [],
};

export const useCreatePortraitFlow = () => {
  const [state, setState] = useState<CreatePortraitFlowState>(INITIAL_STATE);

  const goToStep = useCallback((step: CreatePortraitStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      const stepOrder: CreatePortraitStep[] = [
        "choose_process",
        "manual_creation",
        "manual_add_memories",
        "share_portrait",
      ];
      const currentIndex = stepOrder.indexOf(prev.step);
      if (currentIndex < stepOrder.length - 1) {
        return { ...prev, step: stepOrder[currentIndex + 1] };
      }
      return prev;
    });
  }, []);

  const setPortrait = useCallback((portrait: Portrait | null) => {
    setState((prev) => ({ ...prev, portrait }));
  }, []);

  const setMemoryId = useCallback((memoryId: string | null) => {
    setState((prev) => ({ ...prev, memoryId }));
  }, []);

  const setRemainingFiles = useCallback((files: File[]) => {
    setState((prev) => ({ ...prev, remainingFiles: files }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    goToStep,
    nextStep,
    setPortrait,
    setMemoryId,
    setRemainingFiles,
    reset,
  };
};
