"use client";

import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DialogHeader from "@/components/dashboard/DialogHeader";
import StepAddMemories from "@/components/portraits/create-portrait-steps/StepAddMemories";
import { cn } from "@/lib/utils";
import type { Portrait } from "@/types/portrait-types";

type CreateMemoryDialogProps = {
  portrait: Portrait;
  onClose: () => void;
};

const CreateMemoryDialog = ({ portrait, onClose }: CreateMemoryDialogProps) => {
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
      <DialogTitle className="sr-only">Add memory</DialogTitle>
      <DialogDescription className="sr-only">
        Add a new memory to this portrait by uploading files or creating
        content.
      </DialogDescription>
      <DialogHeader onClose={onClose} />
      <StepAddMemories portrait={portrait} onNext={onClose} />
    </DialogContent>
  );
};

export default CreateMemoryDialog;
