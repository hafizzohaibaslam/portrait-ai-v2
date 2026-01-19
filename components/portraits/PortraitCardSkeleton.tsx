"use client";

import PortraitCardWrapper from "./PortraitCardWrapper";
import { cn } from "@/lib/utils";

type PortraitCardSkeletonProps = {
  className?: string;
};

const PortraitCardSkeleton = ({ className }: PortraitCardSkeletonProps) => {
  return (
    <PortraitCardWrapper className={cn("", className)}>
      {/* Image skeleton - matches PortraitCard h-[172px] with rounded-[4px] */}
      <div className="h-[172px] w-full rounded-[4px] overflow-hidden shimmer" />
      
      {/* Name skeleton - matches PortraitCard text height (text-[18px] leading-[20px]) */}
      <div className="h-5 w-3/4 shimmer rounded-sm" />
    </PortraitCardWrapper>
  );
};

export default PortraitCardSkeleton;
