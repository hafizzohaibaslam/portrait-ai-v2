"use client";

import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/api";
import type { GenieApiResponse, GenieContinueRequest } from "@/types/genie";

/**
 * Hook for continuing an existing Genie conversation
 */
export const useGenieContinueMutation = () => {
  return useMutation({
    mutationFn: async ({ conversation_id, message }: GenieContinueRequest) => {
      const response = await API.post<GenieApiResponse>("/genie/continue", {
        conversation_id,
        message,
      });
      return response.data;
    },
  });
};
