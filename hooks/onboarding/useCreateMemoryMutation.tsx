"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { API } from "@/lib/api";
import type {
  CreateMemoryPayload,
  CreateMemoryResponse,
} from "@/types/memory-types";

export const useCreateMemoryMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateMemoryPayload) => {
      const formData = new FormData();

      // Required field: type
      formData.append("type", payload.type);

      if (payload.type === "note") {
        // For note type: title is required, description is optional
        formData.append("content title", payload.title);
        if (payload.description) {
          formData.append("content description", payload.description);
        }
      } else if (payload.type === "file") {
        // For file type: files array is required
        payload.files.forEach((file) => {
          formData.append("files[]", file);
        });
      }

      const response = await API.post<CreateMemoryResponse>(
        `/portraits/${payload.portrait_id}/memories`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      // Toast is handled in OnboardingFlow after state update
    },
    onError: (error: unknown) => {
      let errorMessage = "Failed to create memory. Please try again";

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
