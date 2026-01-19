"use client";
import { Portrait } from "@/types/portrait-types";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import StepAddMemories from "@/components/portraits/create-portrait-steps/StepAddMemories";
import DialogHeader from "@/components/dashboard/DialogHeader";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
import { Upload } from "lucide-react";

type OnboardMemoriesDialogProps = {
  portrait: Portrait;
  onComplete?: () => void;
};

const OnboardMemoriesDialog = ({ portrait, onComplete }: OnboardMemoriesDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    setOpen(false);
    onComplete?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Onboard Memories</DialogTitle>
      <DialogDescription className="sr-only">Onboard Memories</DialogDescription>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer">
          <DashedBorderWrapper className="h-[264px] flex flex-col items-center justify-center cursor-pointer">
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="bg-accent-purple-001 rounded-full p-4 w-[56px] h-[56px] flex items-center justify-center">
                <Upload className="stroke-dominant-purple-main w-[24px] h-[24px]" />
              </div>
              <div className="mt-8">
                <h1 className="font-light text-[16px] leading-[24px] tracking-[3%] text-dominant-purple-main">
                  Drag & drop or Choose files to upload
                </h1>
                <p className="mt-2 font-normal text-[14px] leading-[24px] tracking-[3%] text-black-003">
                  Supported file types: Images (e.g. PNG & JPEG), Videos (e.g MOV &
                  MP4), Audio (e.g. MP3) and Documents (e.g. PDF & DOCX)
                </p>
              </div>
            </div>
          </DashedBorderWrapper>
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "w-[95%] mx-auto max-w-[1080px]! h-auto max-h-[652px]! flex flex-col overflow-y-auto"
        )}
      >
        <DialogHeader onClose={() => setOpen(false)} />
        <StepAddMemories
          portrait={portrait}
          onNext={handleNext}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OnboardMemoriesDialog;