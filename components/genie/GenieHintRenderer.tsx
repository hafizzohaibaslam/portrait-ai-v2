"use client";

import type { GenieHint } from "@/types/genie";
import GenieActionButtons from "./actions/GenieActionButtons";
import GenieMemoryTypeSelector from "./actions/GenieMemoryTypeSelector";

type GenieHintRendererProps = {
  hints: GenieHint[];
  onActionSelect?: (hint: GenieHint, value: string) => void;
  onMemoryTypeSelect?: (type: "media" | "voice" | "content") => void;
  className?: string;
};

/**
 * Component that renders UI elements based on active hints from API
 */
const GenieHintRenderer = ({
  hints,
  onActionSelect,
  onMemoryTypeSelect,
  className,
}: GenieHintRendererProps) => {
  // Find relevant hints
  const addMemoryHint = hints.find((hint) => hint.action === "add_memory");
  const durationHint = hints.find((hint) => hint.action === "select_duration");
  const memoryTypeHint = hints.find(
    (hint) => hint.action === "select_memory_type"
  );

  const handleActionSelect = (hint: GenieHint, value: string) => {
    if (onActionSelect) {
      onActionSelect(hint, value);
    }
  };

  const handleMemoryTypeSelect = (type: "media" | "voice" | "content") => {
    if (onMemoryTypeSelect) {
      onMemoryTypeSelect(type);
    }
  };

  return (
    <div className={className}>
      {/* Add Memory Button */}
      {addMemoryHint && (
        <button
          onClick={() => handleActionSelect(addMemoryHint, "add_memory")}
          className="mb-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
        >
          Add New Memory
        </button>
      )}

      {/* Memory Type Selector */}
      {memoryTypeHint && (
        <GenieMemoryTypeSelector
          onSelect={handleMemoryTypeSelect}
          className="mb-4"
        />
      )}

      {/* Duration Selection */}
      {durationHint && (
        <GenieActionButtons
          hint={durationHint}
          onSelect={(value) => handleActionSelect(durationHint, value)}
          className="mb-4"
        />
      )}
    </div>
  );
};

export default GenieHintRenderer;
