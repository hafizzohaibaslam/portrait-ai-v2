"use client";
import { Plus } from "lucide-react";
import ResponsiveChip from "./ResponsiveChip";
import CreatePortraitDialog from "@/components/portraits/CreatePortraitDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type CreatePortraitChipProps = {
  className?: string;
};

const CreatePortraitChip = ({ className }: CreatePortraitChipProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <ResponsiveChip
            leadingNode={<Plus className="w-5 h-5" />}
            text={<span>Create Portrait</span>}
            showTextOnMobile
            className={className}
          />
        </div>
      </DialogTrigger>
      <CreatePortraitDialog />
    </Dialog>
  );
};

export default CreatePortraitChip;
