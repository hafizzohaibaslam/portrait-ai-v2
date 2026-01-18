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
      className={cn("flex items-center justify-between bg-white", className)}
    >
      <AppBrand href="/dashboard" />
      <button
        onClick={onClose}
        className="w-9 h-9 cursor-pointer bg-gray-6 rounded-full p-2 hover:bg-gray-4 transition-colors"
        aria-label="Close dialog"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DialogHeader;
