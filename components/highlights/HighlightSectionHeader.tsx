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

export default HighlightSectionHeader;
