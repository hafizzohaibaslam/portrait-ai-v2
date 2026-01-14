"use client";

import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import ResponsiveChip from "./ResponsiveChip";

type CreateHighlightChipProps = {
  onClick?: () => void;
  className?: string;
};

const CreateHighlightChip = ({
  onClick,
  className,
}: CreateHighlightChipProps) => {
  return (
    <ResponsiveChip
      onClick={onClick}
      leadingNode={<Lightbulb className="w-5 h-5" />}
      text={<span>Create Highlight</span>}
      showTextOnMobile
      className={cn("border-accent-purple-001", className)}
    />
  );
};

export default CreateHighlightChip;
