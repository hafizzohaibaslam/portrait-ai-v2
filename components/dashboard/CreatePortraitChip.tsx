"use client";
import { Plus } from "lucide-react";
import ResponsiveChip from "./ResponsiveChip";
import CreatePortraitDialog from "@/components/portraits/CreatePortraitDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

type CreatePortraitChipProps = {
  className?: string;
};

const CreatePortraitChip = ({ className }: CreatePortraitChipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <CreatePortraitDialog onClose={() => setOpen(false)} />
    </Dialog>
  );
};

export default CreatePortraitChip;
