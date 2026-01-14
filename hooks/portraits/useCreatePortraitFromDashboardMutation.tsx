"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { API } from "@/lib/api";
import type {
  CreatePortraitAfterOnboardingPayload,
  CreatePortraitAfterOnboardingResponse,
} from "@/types/portrait-types";

export const useCreatePortraitFromDashboardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePortraitAfterOnboardingPayload) => {
      const formData = new FormData();

      // Required fields
      formData.append("name", payload.name);
      formData.append("relation_type", payload.relation_type);
      formData.append("is_deceased", String(payload.is_deceased));

      // Optional fields
      if (payload.description) {
        formData.append("description", payload.description);
      }
      if (payload.date_of_birth) {
        formData.append("date_of_birth", payload.date_of_birth);
      }
      if (payload.date_of_death) {
        formData.append("date_of_death", payload.date_of_death);
      }
      if (payload.subject_email) {
        formData.append("subject_email", payload.subject_email);
      }
      if (payload.profile_image) {
        formData.append("profile_image", payload.profile_image);
      }

      const response = await API.post<CreatePortraitAfterOnboardingResponse>(
        "/portraits/create",
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
      // Invalidate portraits query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["portraits", "related"] });
      toast.success("Portrait created successfully");
    },
    onError: (error: unknown) => {
      let errorMessage = "Failed to create portrait. Please try again";

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
