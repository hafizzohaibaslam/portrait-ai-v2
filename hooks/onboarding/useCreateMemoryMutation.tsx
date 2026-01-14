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

      // Required fields
      formData.append("portrait_id", payload.portrait_id);
      formData.append("title", payload.title);

      // Optional fields
      if (payload.description) {
        formData.append("description", payload.description);
      }
      if (payload.family_id) {
        formData.append("family_id", payload.family_id);
      }
      if (payload.media_url) {
        formData.append("media_url", payload.media_url);
      }

      // Add media file if provided
      if (payload.media_file) {
        formData.append("media_file", payload.media_file);
      }

      const response = await API.post<CreateMemoryResponse>(
        "/memories/create",
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
        const axiosError = error as { response?: { data?: { error?: string; message?: string } } };
        errorMessage = axiosError.response?.data?.error || 
                      axiosError.response?.data?.message || 
                      errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    },
  });
};
