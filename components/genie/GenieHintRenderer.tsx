"use client";

import type { GenieHint } from "@/types/genie";

type GenieHintRendererProps = {
  hints: GenieHint[];
  onFileSelect?: (files: File[], field: string) => void;
};

/**
 * Component that renders UI elements based on active hints from API
 */
const GenieHintRenderer = ({
  hints,
  onFileSelect,
}: GenieHintRendererProps) => {
  // Find upload hint if present
  const uploadHint = hints.find((hint) => hint.action === "show_upload");

  if (!uploadHint) {
    return null;
  }

  // For now, we'll return null and let GenieFileUpload handle the UI
  // This component can be extended to render other hint types in the future
  return null;
};

export default GenieHintRenderer;
