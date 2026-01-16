"use client";

import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import GenieAttachmentPreview from "./GenieAttachmentPreview";
import GenieDragDropOverlay from "./GenieDragDropOverlay";
import type { GenieHint } from "@/types/genie";
import { GENIE_FILE_LIMITS } from "@/utils/genie/constants";

type GenieFileUploadProps = {
  hint: GenieHint | null;
  files: File[];
  onFilesSelect: (files: File[]) => void;
  onRemove: (index: number) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  className?: string;
};

/**
 * File upload component with hint awareness
 * Shows upload UI only when hint is active
 * Supports drag & drop and file previews
 */
const GenieFileUpload = ({
  hint,
  files,
  onFilesSelect,
  onRemove,
  acceptedTypes = GENIE_FILE_LIMITS.acceptedTypes,
  maxSize = GENIE_FILE_LIMITS.maxSize,
  className,
}: GenieFileUploadProps) => {
  // Don't render if no hint
  if (!hint || hint.action !== "show_upload") {
    return null;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const getAcceptString = () => {
    if (hint.field === "profile_image") {
      return "image/*";
    }
    return acceptedTypes.join(",");
  };

  return (
    <div className={cn("mb-4", className)}>
      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
          {files.map((file, index) => (
            <GenieAttachmentPreview
              key={`${file.name}-${index}-${file.size}`}
              file={file}
              onRemove={() => onRemove(index)}
            />
          ))}
        </div>
      )}

      {/* Upload Button */}
      <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer transition-colors">
        <Paperclip className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {hint.label || "Upload File"}
        </span>
        <input
          type="file"
          className="hidden"
          multiple
          accept={getAcceptString()}
          onChange={handleFileSelect}
        />
      </label>

      {/* Helper Text */}
      <div className="text-xs text-gray-500 mt-2">
        Max {maxSize / (1024 * 1024)}MB per file, up to {GENIE_FILE_LIMITS.maxFiles} files
      </div>
    </div>
  );
};

export default GenieFileUpload;
