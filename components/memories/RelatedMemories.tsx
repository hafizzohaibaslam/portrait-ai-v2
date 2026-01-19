"use client";

import type { Memory } from "@/types/memory-types";
import MemoryCard from "@/components/portraits/portrait-detail/MemoryCard";

type RelatedMemoriesProps = {
  memories: Memory[];
  onMemoryClick?: (memory: Memory) => void;
  className?: string;
};

const RelatedMemories = ({
  memories,
  onMemoryClick,
  className,
}: RelatedMemoriesProps) => {
  if (memories.length === 0) return null;

  return (
    <div className={`space-y-6 ${className || ""}`}>
      <div className="flex items-center gap-4">
        <h3 className="font-normal text-2xl leading-10 text-[#1F1F1F]">
          Related Memories
        </h3>
        <div className="flex items-center gap-2">
          <select className="py-1.5 px-3.5 flex items-center gap-1 font-normal text-sm leading-4 text-[#1F1F1F] bg-white border border-[#EAEAEA] rounded-3xl">
            <option>Most Recent</option>
          </select>
          <select className="py-1.5 px-3.5 flex items-center gap-1 font-normal text-sm leading-4 text-[#1F1F1F] bg-white border border-[#EAEAEA] rounded-3xl">
            <option>All media</option>
          </select>
          <select className="py-1.5 px-3.5 flex items-center gap-1 font-normal text-sm leading-4 text-[#1F1F1F] bg-white border border-[#EAEAEA] rounded-3xl">
            <option>People</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {memories.slice(0, 8).map((memory) => (
          <MemoryCard
            key={memory.memory_id}
            memory={memory}
            onClick={() => onMemoryClick?.(memory)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedMemories;
