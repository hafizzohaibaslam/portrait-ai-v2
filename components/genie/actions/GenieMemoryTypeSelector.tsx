"use client";

import { FileText, Image as ImageIcon, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

type GenieMemoryTypeSelectorProps = {
  onSelect: (type: "media" | "voice" | "content") => void;
  className?: string;
};

const GenieMemoryTypeSelector = ({
  onSelect,
  className,
}: GenieMemoryTypeSelectorProps) => {
  const options: Array<{
    type: "media" | "voice" | "content";
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      type: "media",
      label: "Media",
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      type: "voice",
      label: "Voice",
      icon: <Mic className="w-5 h-5" />,
    },
    {
      type: "content",
      label: "Content",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  return (
    <div className={cn("flex flex-wrap gap-3 mb-4", className)}>
      {options.map((option) => (
        <button
          key={option.type}
          onClick={() => onSelect(option.type)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors",
            "bg-white border-2 border-gray-200 text-gray-700",
            "hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700",
            "active:bg-purple-100"
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default GenieMemoryTypeSelector;
