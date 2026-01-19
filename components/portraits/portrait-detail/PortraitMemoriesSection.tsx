"use client";
import { useState } from "react";
import type { Portrait } from "@/types/portrait-types";
import type { Memory } from "@/types/memory-types";
import PortraitMemoriesHeader from "./PortraitMemoriesHeader";
import PortraitMemoriesGrid from "./PortraitMemoriesGrid";
import PortraitMemoriesFooter from "./PortraitMemoriesFooter";
import MemoryDetailDialog from "@/components/memories/MemoryDetailDialog";
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
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const selectedMemory = memories?.find(m => m.memory_id === selectedMemoryId) || null;

  const handleMemoryClick = (memory: Memory | null) => {
    setSelectedMemoryId(memory?.memory_id || null);
  };

  const relatedMemories = memories?.filter(
    (m) => m.memory_id !== selectedMemory?.memory_id
  ) || [];

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
      
      <MemoryDetailDialog
        open={selectedMemoryId !== null}
        onOpenChange={(memory: Memory | null) => setSelectedMemoryId(memory?.memory_id || null)}
        memory={selectedMemory}
        relatedMemories={relatedMemories}
        
      />
    </div>
  );
};

export default PortraitMemoriesSection;
