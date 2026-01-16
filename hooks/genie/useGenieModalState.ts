"use client";

import { useState, useCallback } from "react";

/**
 * Hook for managing Genie modal state
 */
export const useGenieModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const startNewChat = useCallback(() => {
    // Reset fullscreen when starting new chat (optional)
    // setIsFullscreen(false);
  }, []);

  return {
    isOpen,
    isFullscreen,
    open,
    close,
    toggleFullscreen,
    startNewChat,
  };
};
