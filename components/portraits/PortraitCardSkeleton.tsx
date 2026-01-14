"use client";

import PortraitCardWrapper from "./PortraitCardWrapper";
import { cn } from "@/lib/utils";

type PortraitCardSkeletonProps = {
  className?: string;
};

const PortraitCardSkeleton = ({ className }: PortraitCardSkeletonProps) => {
  return (
    <PortraitCardWrapper className={cn("animate-pulse", className)}>
      <div className="h-[180px] rounded-md bg-gray-2" />
      <div className="mt-3 h-5 w-3/4 bg-gray-2 rounded" />
    </PortraitCardWrapper>
  );
};

export default PortraitCardSkeleton;
