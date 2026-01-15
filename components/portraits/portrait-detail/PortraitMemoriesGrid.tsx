"use client";

import type { Portrait } from "@/types/portrait-types";
import type { Memory } from "@/types/memory-types";
import MemoryCard from "./MemoryCard";
import CreateMemoryCard from "./CreateMemoryCard";
import MemoryCardSkeleton from "./MemoryCardSkeleton";
import { cn } from "@/lib/utils";

type PortraitMemoriesGridProps = {
  portrait: Portrait;
  memories?: Memory[];
  isLoading?: boolean;
  onMemoryClick: (memory: Memory) => void;
  className?: string;
};

const PortraitMemoriesGrid = ({
  portrait,
  memories,
  isLoading,
  onMemoryClick,
  className,
}: PortraitMemoriesGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
    >
      <CreateMemoryCard portrait={portrait} />
      {isLoading ? (
        <>
          <MemoryCardSkeleton />
          <MemoryCardSkeleton />
          <MemoryCardSkeleton />
        </>
      ) : memories && memories.length > 0 ? (
        memories.map((memory) => (
          <MemoryCard
            key={memory.memory_id}
            memory={memory}
            onClick={() => onMemoryClick(memory)}
          />
        ))
      ) : null}
    </div>
  );
};

export default PortraitMemoriesGrid;
