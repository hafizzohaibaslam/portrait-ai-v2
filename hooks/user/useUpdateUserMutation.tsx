"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { API } from "@/lib/api";
import type { User } from "@/types/global-types";
import type { SettingsFormData } from "@/types/settings";

type UpdateUserPayload = {
  name?: string;
  phone_number?: string;
  profile_image?: File;
  notifications?: Record<string, boolean>;
  privacy?: Record<string, boolean>;
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SettingsFormData) => {
      const formData = new FormData();
      const payload: UpdateUserPayload = {};

      if (data.name) payload.name = data.name;
      if (data.phone_number !== undefined) payload.phone_number = data.phone_number;
      if (data.notifications) payload.notifications = data.notifications;
      if (data.privacy) payload.privacy = data.privacy;

      if (data.profile_image) {
        formData.append("profile_image", data.profile_image);
      }

      // Add other fields to formData if profile_image exists, otherwise use JSON
      if (data.profile_image) {
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined) {
            if (typeof value === "object") {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value.toString());
            }
          }
        });
        const response = await API.put<{ user: User }>("/users/me", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      } else {
        const response = await API.put<{ user: User }>("/users/me", payload);
        return response.data;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "me"], data.user);
      toast.success("Settings updated successfully");
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
