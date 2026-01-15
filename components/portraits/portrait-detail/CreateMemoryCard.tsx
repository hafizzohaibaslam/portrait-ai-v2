"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
import CreateMemoryDialog from "./CreateMemoryDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Portrait } from "@/types/portrait-types";

type CreateMemoryCardProps = {
  portrait: Portrait;
  className?: string;
};

const CreateMemoryCard = ({ portrait, className }: CreateMemoryCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={cn("", className)}>
          <DashedBorderWrapper
            borderColorTheme="primary"
            className="flex flex-col items-center justify-center h-full min-h-[150px] cursor-pointer"
          >
            <div className="bg-accent-purple-001 p-4 rounded-full">
              <Plus className="w-6 h-6 stroke-dominant-purple-main" />
            </div>
            <div className="font-light mt-4 text-sm">Add Memory</div>
          </DashedBorderWrapper>
        </div>
      </DialogTrigger>
      <CreateMemoryDialog portrait={portrait} onClose={() => setOpen(false)} />
    </Dialog>
  );
};

export default CreateMemoryCard;
