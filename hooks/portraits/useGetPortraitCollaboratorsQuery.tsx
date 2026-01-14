"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";

export type Collaborator = {
  email: string;
  role: string;
  img?: string;
  bg?: string;
  color?: string;
};

type CollaboratorsResponse = Collaborator[];

export const useGetPortraitCollaboratorsQuery = (portraitId: string | null) => {
  return useQuery({
    queryKey: ["portrait", portraitId, "collaborators"],
    queryFn: async () => {
      if (!portraitId) throw new Error("Portrait ID is required");
      const response = await API.get<CollaboratorsResponse>(
        `/portraits/${portraitId}/collaborators`
      );
      return response.data;
    },
    enabled: !!portraitId,
  });
};
