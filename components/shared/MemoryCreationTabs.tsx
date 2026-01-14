"use client";

import { cn } from "@/lib/utils";

type MemoryCreationTabsProps = {
  activeTab: "upload" | "content";
  onTabChange: (tab: "upload" | "content") => void;
  className?: string;
};

const MemoryCreationTabs = ({
  activeTab,
  onTabChange,
  className,
}: MemoryCreationTabsProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center p-1 rounded-[6px] gap-0 bg-[#EDEDED]",
        className
      )}
    >
      <button
        onClick={() => onTabChange("upload")}
        className={cn(
          "py-2 font-normal text-[16px] leading-6 flex-1 text-center rounded-[6px]",
          activeTab === "upload"
            ? "bg-white text-[#1F1F1F]"
            : "bg-transparent text-[#6A6A6A]"
        )}
      >
        Upload files
      </button>
      <button
        onClick={() => onTabChange("content")}
        className={cn(
          "py-2 font-normal text-[16px] leading-6 flex-1 text-center rounded-[6px]",
          activeTab === "content"
            ? "bg-white text-[#1F1F1F]"
            : "bg-transparent text-[#6A6A6A]"
        )}
      >
        Create Content
      </button>
    </div>
  );
};

export default MemoryCreationTabs;
