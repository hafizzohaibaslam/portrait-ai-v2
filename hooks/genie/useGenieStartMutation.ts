"use client";

import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/api";
import type { GenieApiResponse } from "@/types/genie";

/**
 * Hook for starting a new Genie conversation
 */
export const useGenieStartMutation = () => {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await API.post<GenieApiResponse>("/genie/start", {
        message,
      });
      return response.data;
    },
  });
};
