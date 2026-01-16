"use client";

import { useState, useCallback, useMemo } from "react";
import type { GenieAction, GenieActionType } from "@/types/genie";

/**
 * Hook for managing Genie actions
 * Provides helper methods to check and manage action state
 */
export const useGenieActions = (initialAction: GenieAction | null = null) => {
  const [pendingAction, setPendingAction] = useState<GenieAction | null>(
    initialAction
  );

  // Check if action is ready
  const isActionReady = useMemo(
    () => pendingAction !== null && pendingAction.ready === true,
    [pendingAction]
  );

  // Check if specific action type is pending
  const hasAction = useCallback(
    (actionType: GenieActionType): boolean => {
      return (
        pendingAction?.action === actionType && pendingAction.ready === true
      );
    },
    [pendingAction]
  );

  // Update action
  const updateAction = useCallback((action: GenieAction | null) => {
    setPendingAction(action);
  }, []);

  // Clear action
  const clearAction = useCallback(() => {
    setPendingAction(null);
  }, []);

  return {
    pendingAction,
    isActionReady,
    hasAction,
    updateAction,
    clearAction,
  };
};
