"use client";

import StepChooseProcess from "./StepChooseProcess";
import StepManualCreation from "./StepManualCreation";
import StepAddMemories from "./StepAddMemories";
import StepSharePortrait from "./StepSharePortrait";
import type { CreatePortraitFlowState } from "@/types/create-portrait-flow";
import { useCreatePortraitFlow } from "@/hooks/portraits/useCreatePortraitFlow";

type CreatePortraitStepRendererProps = {
  state: CreatePortraitFlowState;
  handlers: Omit<ReturnType<typeof useCreatePortraitFlow>, "state">;
  onClose: () => void;
};

const CreatePortraitStepRenderer = ({
  state,
  handlers,
  onClose,
}: CreatePortraitStepRendererProps) => {
  const { step, portrait } = state;
  const { goToStep, setPortrait, nextStep } = handlers;

  switch (step) {
    case "choose_process":
      return (
        <StepChooseProcess
          onSelect={(option) => {
            if (option === "manual") {
              goToStep("manual_creation");
            }
          }}
        />
      );

    case "manual_creation":
      return (
        <StepManualCreation
          onNext={(newPortrait) => {
            setPortrait(newPortrait);
            nextStep();
          }}
        />
      );

    case "manual_add_memories":
      if (!portrait) {
        goToStep("choose_process");
        return null;
      }
      return (
        <StepAddMemories
          portrait={portrait}
          onNext={() => {
            // Memory created, close dialog
            onClose();
          }}
          onShare={() => {
            goToStep("share_portrait");
          }}
        />
      );

    case "share_portrait":
      if (!portrait) {
        goToStep("choose_process");
        return null;
      }
      return (
        <StepSharePortrait
          portrait={portrait}
          onNext={() => {
            onClose();
          }}
        />
      );

    default:
      return null;
  }
};

export default CreatePortraitStepRenderer;
