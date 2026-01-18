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
    <div
      className={cn(
        "font-normal text-[24px] leading-[40px] tracking-[-3%] text-off-black",
        className
      )}
    >
      {title}
    </div>
  );
};

export default PortraitSectionHeader;
