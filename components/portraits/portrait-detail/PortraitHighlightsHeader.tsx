"use client";
import { cn } from "@/lib/utils";

type PortraitHighlightsHeaderProps = {
  className?: string;
};

const PortraitHighlightsHeader = ({
  className,
}: PortraitHighlightsHeaderProps) => {
  return (
    <div className={cn("text-2xl font-medium", className)}>Your Highlights</div>
  );
};

export default PortraitHighlightsHeader;
