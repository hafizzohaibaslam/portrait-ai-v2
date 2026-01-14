"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import PortraitCard from "./PortraitCard";
import CreatePortraitDialog from "./CreatePortraitDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type CreatePortraitCardProps = {
  className?: string;
};

const CreatePortraitCard = ({ className }: CreatePortraitCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <PortraitCard
            portrait={{
              portrait_id: "",
              name: "Untitled Portrait",
              email: null,
              user_id: null,
              creator_user_id: "",
              image_url: "",
              description: null,
              date_of_birth: null,
              date_of_death: null,
              is_deceased: false,
              is_collaborative: false,
              family_ids: [],
              contributor_user_ids: [],
            }}
            coverNode={
              <div className="cursor-pointer bg-accent-purple-001 flex flex-col items-center justify-center h-full">
                <div className="bg-purple-5 p-4 rounded-full">
                  <Plus className="stroke-dominant-purple-main w-6 h-6" />
                </div>
                <div className="font-light mt-8">Create new portrait</div>
              </div>
            }
            className={className}
          />
        </div>
      </DialogTrigger>
      <CreatePortraitDialog onClose={() => setOpen(false)} />
    </Dialog>
  );
};

export default CreatePortraitCard;
