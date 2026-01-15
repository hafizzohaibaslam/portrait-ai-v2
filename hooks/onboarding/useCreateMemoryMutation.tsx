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
      // portrait_id is passed as query parameter
      const url = `/memories/create?portrait_id=${payload.portrait_id}`;

      if (payload.type === "content") {
        if ("body" in payload && payload.body) {
          // Typed text content - use JSON
          const response = await API.post<CreateMemoryResponse>(
            url,
            {
              type: "content",
              body: payload.body,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          return response.data;
        } else if ("files" in payload && payload.files) {
          // Recorded audio - use multipart/form-data with type="content"
          const formData = new FormData();
          formData.append("type", "content");
          if (payload.files.length > 0) {
            formData.append("files[0]", payload.files[0]);
          }

          const response = await API.post<CreateMemoryResponse>(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data;
        }
      } else if (payload.type === "file") {
        // File upload - use multipart/form-data
        const formData = new FormData();
        formData.append("type", "file");
        payload.files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });

        const response = await API.post<CreateMemoryResponse>(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      }

      throw new Error("Invalid payload type");
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
