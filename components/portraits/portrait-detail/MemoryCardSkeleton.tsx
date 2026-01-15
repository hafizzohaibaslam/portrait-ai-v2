"use client";

import { cn } from "@/lib/utils";

type MemoryCardSkeletonProps = {
  className?: string;
};

const MemoryCardSkeleton = ({ className }: MemoryCardSkeletonProps) => {
  return (
    <div
      className={cn(
        "p-2 bg-white rounded-3xl border border-gray-200",
        className
      )}
    >
      <div className="w-full aspect-[4/3] rounded-2xl bg-gray-2 animate-pulse" />
    </div>
  );
};

export default MemoryCardSkeleton;
