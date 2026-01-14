"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { useAuthContext } from "@/providers/AuthContext";
import type { Highlight } from "@/types/highlights";

export const useGetAllHighlights = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["highlights", user?.user_id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const response = await API.get<Highlight[]>("/highlights");
      return response.data;
    },
    enabled: !!user,
  });
};
