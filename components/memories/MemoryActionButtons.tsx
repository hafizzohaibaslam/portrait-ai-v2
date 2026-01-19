"use client";
import Image from "next/image";
import DeleteMemoryDialog from "./DeleteMemoryDialog";
import type { Memory } from "@/types/memory-types";
import { cn } from "@/lib/utils";
import MemoryShareDialog from "./MemoryShareDialog";

type MemoryActionButtonsProps = {
  memory: Memory;
  onShare?: () => void;
  onDownload?: () => void;
  className?: string;
};

const MemoryActionButtons = ({
  memory,
  onDownload,
  className,
}: MemoryActionButtonsProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <MemoryShareDialog
        memory={memory}
      />
      <button
        onClick={onDownload}
        className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        title="Download"
      >
        <Image
          src="/icons/download.png"
          alt="download"
          width={24}
          height={24}
        />
      </button>
      <DeleteMemoryDialog
        memory={memory}
      />
    </div>
  );
};

export default MemoryActionButtons;
