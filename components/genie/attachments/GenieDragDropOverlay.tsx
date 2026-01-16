"use client";

import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type GenieDragDropOverlayProps = {
  isActive: boolean;
  hintLabel?: string;
  className?: string;
};

/**
 * Overlay component shown when dragging files over the drop zone
 */
const GenieDragDropOverlay = ({
  isActive,
  hintLabel,
  className,
}: GenieDragDropOverlayProps) => {
  if (!isActive) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-purple-500/10 backdrop-blur-sm",
        "flex items-center justify-center",
        "pointer-events-none",
        className
      )}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-dashed border-purple-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <Upload className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              Drop files here
            </div>
            {hintLabel && (
              <div className="text-sm text-gray-600 mt-1">{hintLabel}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenieDragDropOverlay;
