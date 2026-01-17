"use client";

import { cn } from "@/lib/utils";
import type { GenieHint } from "@/types/genie";

type GenieActionButtonsProps = {
  hint: GenieHint;
  onSelect: (value: string) => void;
  className?: string;
};

/**
 * Renders action buttons based on hint type
 * Supports duration selection and memory type selection
 */
const GenieActionButtons = ({
  hint,
  onSelect,
  className,
}: GenieActionButtonsProps) => {
  const isDurationSelection = hint.action === "select_duration";
  const isMemoryTypeSelection = hint.action === "select_memory_type";

  if (!isDurationSelection && !isMemoryTypeSelection) {
    return null;
  }

  const options =
    (isDurationSelection
      ? hint.metadata?.durations
      : hint.metadata?.memory_types) || [];

  if (options.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2 mb-4", className)}>
      {options.map((option, index) => (
        <button
          key={`${option}-${index}`}
          onClick={() => onSelect(option)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            "bg-white border border-gray-200 text-gray-700",
            "hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700",
            "active:bg-purple-100"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default GenieActionButtons;
