"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { API } from "@/lib/api";
import type { Memory } from "@/types/memory-types";

export type UpdateMemoryPayload = {
  title?: string;
  description?: string;
  media_url?: string;
};

type UpdateMemoryResponse = {
  message: string;
  memory: Memory;
};

export const useUpdateMemoryMutation = () => {
  return useMutation({
    mutationFn: async ({
      memoryId,
      payload,
    }: {
      memoryId: string;
      payload: UpdateMemoryPayload;
    }) => {
      const response = await API.put<UpdateMemoryResponse>(
        `/memories/${memoryId}`,
        payload
      );

      return response.data;
    },
    onSuccess: () => {
      // Toast is handled in OnboardingFlow after navigation
    },
    onError: (error: unknown) => {
      let errorMessage = "Failed to update memory. Please try again";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { error?: string; message?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error ||
          axiosError.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};
