"use client";

import { useState, useCallback, useMemo } from "react";
import type { GenieHint, GenieHintAction } from "@/types/genie";

/**
 * Hook for managing Genie hints
 * Provides helper methods to check and manage hint state
 */
export const useGenieHints = (initialHints: GenieHint[] = []) => {
  const [activeHints, setActiveHints] = useState<GenieHint[]>(initialHints);

  // Check if specific hint action is active
  const hasHint = useCallback(
    (action: GenieHintAction): boolean => {
      return activeHints.some((hint) => hint.action === action);
    },
    [activeHints]
  );

  // Get specific hint by action
  const getHint = useCallback(
    (action: GenieHintAction): GenieHint | null => {
      return activeHints.find((hint) => hint.action === action) || null;
    },
    [activeHints]
  );

  // Check for upload hint
  const hasUploadHint = useMemo(() => hasHint("show_upload"), [hasHint]);

  // Get upload hint
  const uploadHint = useMemo(() => getHint("show_upload"), [getHint]);

  // Update hints
  const updateHints = useCallback((hints: GenieHint[]) => {
    setActiveHints(hints);
  }, []);

  // Show hint
  const showHint = useCallback((hint: GenieHint) => {
    setActiveHints((prev) => {
      // Remove existing hint with same action
      const filtered = prev.filter((h) => h.action !== hint.action);
      return [...filtered, hint];
    });
  }, []);

  // Hide hint
  const hideHint = useCallback((action: GenieHintAction) => {
    setActiveHints((prev) => prev.filter((h) => h.action !== action));
  }, []);

  // Clear all hints
  const clearHints = useCallback(() => {
    setActiveHints([]);
  }, []);

  return {
    activeHints,
    hasHint,
    getHint,
    hasUploadHint,
    uploadHint,
    updateHints,
    showHint,
    hideHint,
    clearHints,
  };
};
