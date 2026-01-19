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
        "w-[95%] mx-auto max-w-[1080px]! h-auto max-h-[652px]! flex flex-col overflow-y-auto")}
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
