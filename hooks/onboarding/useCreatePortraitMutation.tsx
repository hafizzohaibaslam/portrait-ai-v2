"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { API } from "@/lib/api";
import type {
  CreatePortraitPayload,
  PortraitCreationResponse,
} from "@/types/portrait-types";

export const useCreatePortraitMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreatePortraitPayload) => {
      const formData = new FormData();

      // Add all text fields
      formData.append("name", payload.name);
      formData.append("relation_type", payload.relation_type);
      formData.append("is_deceased", String(payload.is_deceased));

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
      if (payload.family_id) {
        formData.append("family_id", payload.family_id);
      }

      // Add files based on relation type
      if (payload.relation_type !== "your-own" && payload.portrait_image) {
        formData.append("portrait_image", payload.portrait_image);
      }

      if (payload.profile_image) {
        formData.append("profile_image", payload.profile_image);
      }

      const response = await API.post<PortraitCreationResponse>(
        "/onboard/create-portrait",
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
      let errorMessage = "Failed to create portrait. Please try again";
      
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
