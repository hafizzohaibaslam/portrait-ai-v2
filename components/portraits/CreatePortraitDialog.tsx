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
        "bottom-4 top-[unset] translate-y-0",
        "md:bottom-[unset] md:top-[50%] md:translate-y-[-50%]",
        "block p-8 pt-0 outline-0",
        "rounded-xl md:rounded-2xl",
        "overflow-y-auto",
        "w-full max-w-[950px]!",
        "h-auto max-h-[90vh] md:max-h-[92vh]",
        "border-none"
      )}
    >
      <DialogTitle className="sr-only">Create a new Portrait</DialogTitle>
      <DialogDescription className="sr-only">
        Create a new portrait by following the steps below.
      </DialogDescription>
      <DialogHeader onClose={handleClose} />

      <div>
        <CreatePortraitStepRenderer
          state={state}
          handlers={handlers}
          onClose={handleClose}
        />
      </div>
    </DialogContent>
  );
};

export default CreatePortraitDialog;
