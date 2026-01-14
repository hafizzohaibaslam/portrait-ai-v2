"use client";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import AppBrand from "@/components/shared/AppBrand";

type DialogHeaderProps = {
  onClose?: () => void;
  className?: string;
};

const DialogHeader = ({ onClose, className }: DialogHeaderProps) => {
  return (
    <div
      className={cn(
        "z-1 sticky top-0 flex items-center justify-between bg-white pt-8 pb-4 mb-2 md:mb-8",
        className
      )}
    >
      <AppBrand href="/dashboard" />
      <button
        onClick={onClose}
        className="cursor-pointer bg-gray-6 rounded-full p-3"
        aria-label="Close dialog"
      >
        <X className="stroke-[1px] stroke-off-black w-5 h-5" />
      </button>
    </div>
  );
};

export default DialogHeader;
