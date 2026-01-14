"use client";

import { cn } from "@/lib/utils";

type PortraitSectionHeaderProps = {
  title: string;
  className?: string;
};

const PortraitSectionHeader = ({
  title,
  className,
}: PortraitSectionHeaderProps) => {
  return (
    <div className={cn("text-2xl font-semibold text-off-black", className)}>
      {title}
    </div>
  );
};

export default PortraitSectionHeader;
