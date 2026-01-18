"use client";

import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DialogHeader from "@/components/dashboard/DialogHeader";
import { useCreatePortraitFlow } from "@/hooks/portraits/useCreatePortraitFlow";
import CreatePortraitStepRenderer from "./create-portrait-steps/CreatePortraitStepRenderer";
import { cn } from "@/lib/utils";

type CreatePortraitDialogProps = {
  onClose?: () => void;
};

const CreatePortraitDialog = ({ onClose }: CreatePortraitDialogProps = {}) => {
  const { state, ...handlers } = useCreatePortraitFlow();

  const handleClose = () => {
    handlers.reset();
    onClose?.();
  };

  return (
    <DialogContent
      showCloseButton={false}
      className={cn(
        "w-[95%] mx-auto max-w-[1080px]! h-auto max-h-[652px]! flex flex-col overflow-y-auto"
      )}
    >
      <DialogTitle className="sr-only">Create a new Portrait</DialogTitle>
      <DialogDescription className="sr-only">
        Create a new portrait by following the steps below.
      </DialogDescription>
      <DialogHeader onClose={handleClose} />

      <CreatePortraitStepRenderer
        state={state}
        handlers={handlers}
        onClose={handleClose}
      />
    </DialogContent>
  );
};

export default CreatePortraitDialog;
