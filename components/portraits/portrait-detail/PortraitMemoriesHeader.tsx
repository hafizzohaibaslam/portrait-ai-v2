"use client";

import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type PortraitMemoriesHeaderProps = {
  onEditClick?: () => void;
  className?: string;
};

const PortraitMemoriesHeader = ({
  onEditClick,
  className,
}: PortraitMemoriesHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="text-2xl font-medium">Memories</div>
      {onEditClick && (
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 text-sm font-medium text-dominant-purple-main hover:underline"
        >
          <Pencil size={16} />
          <span>Edit</span>
        </button>
      )}
    </div>
  );
};

export default PortraitMemoriesHeader;
