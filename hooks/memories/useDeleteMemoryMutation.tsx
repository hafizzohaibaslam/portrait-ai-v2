"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { API } from "@/lib/api";

export const useDeleteMemoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memoryId: string) => {
      const response = await API.delete(`/memories/${memoryId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Memory deleted successfully");
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["portrait"] });
      queryClient.invalidateQueries({ queryKey: ["memories"] });
    },
    onError: (error: unknown) => {
        let errorMessage = "Failed to update settings. Please try again";

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
