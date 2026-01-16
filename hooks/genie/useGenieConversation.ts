"use client";

import { useState, useCallback, useEffect } from "react";
import { useGenieStartMutation } from "./useGenieStartMutation";
import { useGenieContinueMutation } from "./useGenieContinueMutation";
import {
  saveConversationId,
  getConversationId,
  clearConversationId,
} from "@/utils/genie/storage";
import { generateMessageId } from "@/utils/genie/api-helpers";
import type {
  GenieMessage,
  GenieHint,
  GenieAction,
  GenieApiResponse,
} from "@/types/genie";

/**
 * Main hook for managing Genie conversation flow
 * Handles API integration, state management, and conversation persistence
 */
export const useGenieConversation = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<GenieMessage[]>([]);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>(
    {}
  );
  const [activeHints, setActiveHints] = useState<GenieHint[]>([]);
  const [pendingAction, setPendingAction] = useState<GenieAction | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const startMutation = useGenieStartMutation();
  const continueMutation = useGenieContinueMutation();

  const isLoading = startMutation.isPending || continueMutation.isPending;

  // Restore conversation ID on mount
  useEffect(() => {
    const savedId = getConversationId();
    if (savedId) {
      setConversationId(savedId);
    }
  }, []);

  // Handle API response
  const handleApiResponse = useCallback((response: GenieApiResponse) => {
    // Save conversation_id if present
    if (response.conversation_id) {
      setConversationId(response.conversation_id);
      saveConversationId(response.conversation_id);
    }

    // Add assistant message
    if (response.message) {
      const assistantMessage: GenieMessage = {
        id: generateMessageId(),
        role: "assistant",
        content: response.message,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }

    // Update hints
    if (response.hints && response.hints.length > 0) {
      setActiveHints(response.hints);
    } else {
      setActiveHints([]);
    }

    // Update collected_data
    if (response.collected_data) {
      const { action, ...data } = response.collected_data;
      setCollectedData(data);

      // Check for action
      if (action && typeof action === "object" && "ready" in action) {
        setPendingAction(action as GenieAction);
      } else {
        setPendingAction(null);
      }
    }
  }, []);

  // Start a new conversation
  const startConversation = useCallback(
    async (message: string) => {
      setError(null);
      setLastUserMessage(message);

      // Add user message optimistically
      const userMessage: GenieMessage = {
        id: generateMessageId(),
        role: "user",
        content: message,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await startMutation.mutateAsync(message);
        handleApiResponse(response);
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to start conversation");
        setError(error);

        // Remove optimistic message on error
        setMessages((prev) => prev.slice(0, -1));

        // Handle specific error cases
        if (
          err &&
          typeof err === "object" &&
          "response" in err &&
          typeof err.response === "object" &&
          err.response !== null &&
          "status" in err.response
        ) {
          const status = (err.response as { status: number }).status;
          if (status === 404 || status === 403) {
            clearConversationId();
            setConversationId(null);
          }
        }
      }
    },
    [startMutation, handleApiResponse]
  );

  // Continue existing conversation
  const continueConversation = useCallback(
    async (message: string) => {
      if (!conversationId) {
        // If no conversation ID, start new conversation
        await startConversation(message);
        return;
      }

      setError(null);
      setLastUserMessage(message);

      // Add user message optimistically
      const userMessage: GenieMessage = {
        id: generateMessageId(),
        role: "user",
        content: message,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await continueMutation.mutateAsync({
          conversation_id: conversationId,
          message,
        });
        handleApiResponse(response);
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to continue conversation");
        setError(error);

        // Remove optimistic message on error
        setMessages((prev) => prev.slice(0, -1));

        // Handle specific error cases
        if (
          err &&
          typeof err === "object" &&
          "response" in err &&
          typeof err.response === "object" &&
          err.response !== null &&
          "status" in err.response
        ) {
          const status = (err.response as { status: number }).status;
          if (status === 404 || status === 403) {
            // Conversation invalid, clear and start fresh
            clearConversationId();
            setConversationId(null);
            // Optionally retry as new conversation
            if (message) {
              await startConversation(message);
            }
          }
        }
      }
    },
    [conversationId, continueMutation, handleApiResponse, startConversation]
  );

  // Clear conversation
  const clearConversation = useCallback(() => {
    setMessages([]);
    setCollectedData({});
    setActiveHints([]);
    setPendingAction(null);
    setError(null);
    setLastUserMessage(null);
    clearConversationId();
    setConversationId(null);
  }, []);

  // Retry last message
  const retryLastMessage = useCallback(async () => {
    if (lastUserMessage) {
      if (conversationId) {
        await continueConversation(lastUserMessage);
      } else {
        await startConversation(lastUserMessage);
      }
    }
  }, [lastUserMessage, conversationId, continueConversation, startConversation]);

  // Helper computed values
  const hasActiveHints = activeHints.length > 0;
  const hasPendingAction = pendingAction !== null;
  const isActionReady = pendingAction?.ready === true;

  return {
    // State
    conversationId,
    messages,
    collectedData,
    activeHints,
    pendingAction,
    isLoading,
    error,

    // Actions
    startConversation,
    continueConversation,
    clearConversation,
    retryLastMessage,

    // Helpers
    hasActiveHints,
    hasPendingAction,
    isActionReady,
  };
};
