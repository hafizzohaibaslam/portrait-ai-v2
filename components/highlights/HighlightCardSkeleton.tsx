"use client";
import HighlightCardWrapper from "./HighlightCardWrapper";
import { cn } from "@/lib/utils";

type HighlightCardSkeletonProps = {
  className?: string;
};

const HighlightCardSkeleton = ({ className }: HighlightCardSkeletonProps) => {
  return (
    <HighlightCardWrapper className={cn("animate-pulse", className)}>
      <div className="w-full h-full bg-gray-2" />
    </HighlightCardWrapper>
  );
};

export default HighlightCardSkeleton;
