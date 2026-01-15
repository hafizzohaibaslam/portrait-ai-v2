"use client";

import { useState } from "react";
import type { Portrait } from "@/types/portrait-types";
import type { Memory } from "@/types/memory-types";
import PortraitMemoriesHeader from "./PortraitMemoriesHeader";
import PortraitMemoriesGrid from "./PortraitMemoriesGrid";
import PortraitMemoriesFooter from "./PortraitMemoriesFooter";
import { cn } from "@/lib/utils";

type PortraitMemoriesSectionProps = {
  portrait: Portrait;
  memories?: Memory[];
  isLoading?: boolean;
  className?: string;
};

const PortraitMemoriesSection = ({
  portrait,
  memories,
  isLoading,
  className,
}: PortraitMemoriesSectionProps) => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [memoryDialogOpen, setMemoryDialogOpen] = useState(false);

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
    setMemoryDialogOpen(true);
  };

  return (
    <div className={cn("", className)}>
      <PortraitMemoriesHeader />
      <PortraitMemoriesGrid
        portrait={portrait}
        memories={memories}
        isLoading={isLoading}
        onMemoryClick={handleMemoryClick}
      />
      {memories && memories.length > 0 && <PortraitMemoriesFooter />}
      {/* TODO: Add MemoryDetailDialog */}
    </div>
  );
};

export default PortraitMemoriesSection;
