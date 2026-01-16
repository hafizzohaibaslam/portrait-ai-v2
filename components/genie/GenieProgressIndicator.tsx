"use client";

import { cn } from "@/lib/utils";
import type { GenieActionType } from "@/types/genie";

type GenieProgressIndicatorProps = {
  collectedData: Record<string, unknown>;
  actionType?: GenieActionType;
  className?: string;
};

/**
 * Component that displays progress based on collected_data
 * Shows what information has been collected so far
 */
const GenieProgressIndicator = ({
  collectedData,
  actionType,
  className,
}: GenieProgressIndicatorProps) => {
  // Filter out action field if present
  const dataFields = Object.entries(collectedData).filter(
    ([key]) => key !== "action"
  );

  if (dataFields.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2",
        className
      )}
    >
      <div className="text-sm font-medium text-gray-700">
        Information Collected:
      </div>
      <div className="flex flex-wrap gap-2">
        {dataFields.map(([key, value]) => {
          // Format key for display
          const displayKey = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          // Format value for display
          let displayValue = String(value);
          if (typeof value === "boolean") {
            displayValue = value ? "Yes" : "No";
          }

          return (
            <div
              key={key}
              className="bg-white border border-gray-200 rounded-md px-3 py-1 text-xs"
            >
              <span className="font-medium text-gray-600">{displayKey}:</span>{" "}
              <span className="text-gray-800">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenieProgressIndicator;
