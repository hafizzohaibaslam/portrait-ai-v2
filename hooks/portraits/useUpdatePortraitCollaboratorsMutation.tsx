"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { API } from "@/lib/api";
import type { Collaborator } from "./useGetPortraitCollaboratorsQuery";

type UpdateCollaboratorsPayload = {
  collaborators: Collaborator[];
  addedEmails: string[];
  newCollaboratorRole: string;
};

type UpdateCollaboratorsResponse = {
  message: string;
};

export const useUpdatePortraitCollaboratorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      portraitId,
      payload,
    }: {
      portraitId: string;
      payload: UpdateCollaboratorsPayload;
    }) => {
      const response = await API.put<UpdateCollaboratorsResponse>(
        `/portraits/${portraitId}/collaborators`,
        payload
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["portrait", variables.portraitId, "collaborators"],
      });
      toast.success("Collaborators updated successfully");
    },
    onError: (error: unknown) => {
      let errorMessage = "Failed to update collaborators. Please try again";

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
