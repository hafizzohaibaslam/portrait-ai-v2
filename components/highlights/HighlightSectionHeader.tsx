"use client";
import { cn } from "@/lib/utils";

type HighlightSectionHeaderProps = {
  title: string;
  className?: string;
};

const HighlightSectionHeader = ({
  title,
  className,
}: HighlightSectionHeaderProps) => {
  return (
    <div className={cn("text-2xl font-semibold text-off-black", className)}>
      {title}
    </div>
  );
};

export default HighlightSectionHeader;
