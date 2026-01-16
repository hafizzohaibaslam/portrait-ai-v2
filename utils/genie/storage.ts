// Genie AI Storage Helpers

import { GENIE_STORAGE_KEYS } from "./constants";

/**
 * Save conversation ID to localStorage
 */
export const saveConversationId = (id: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(GENIE_STORAGE_KEYS.conversationId, id);
  }
};

/**
 * Get conversation ID from localStorage
 */
export const getConversationId = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(GENIE_STORAGE_KEYS.conversationId);
  }
  return null;
};

/**
 * Clear conversation ID from localStorage
 */
export const clearConversationId = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(GENIE_STORAGE_KEYS.conversationId);
  }
};
