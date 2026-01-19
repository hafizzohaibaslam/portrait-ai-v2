"use client";

import { X } from "lucide-react";
import AppBrand from "@/components/shared/AppBrand";
import { cn } from "@/lib/utils";

type MemoryDialogHeaderProps = {
  onClose?: () => void;
  className?: string;
};

const MemoryDialogHeader = ({
  onClose,
  className,
}: MemoryDialogHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-4 px-6 border-b border-gray-100",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <AppBrand href="/dashboard" className="!text-base" />
        <div className="text-sm text-gray-500">
          My Portrait &gt; Your Memories &gt; Memory
        </div>
      </div>
      <button
        onClick={onClose}
        className="cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-colors"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default MemoryDialogHeader;
