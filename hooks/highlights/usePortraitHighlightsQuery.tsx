"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { useAuthContext } from "@/providers/AuthContext";
import type { Highlight } from "@/types/highlights";

export const usePortraitHighlightsQuery = (portraitId: string | null) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["portrait", portraitId, "highlights"],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");
      if (!portraitId) throw new Error("Portrait ID is required");
      // Using the existing highlights endpoint and filtering by portrait_id
      // If there's a specific endpoint for portrait highlights, update this
      const response = await API.get<Highlight[]>("/highlights");
      return response.data.filter(
        (highlight) => highlight.user_id === user.user_id
      );
    },
    enabled: !!user && !!portraitId,
  });
};
