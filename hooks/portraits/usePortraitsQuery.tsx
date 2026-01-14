"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { useAuthContext } from "@/providers/AuthContext";
import type { Portrait } from "@/types/portrait-types";

type PortraitsResponse = {
  portraits: Portrait[];
  count?: number;
};

export const usePortraitsQuery = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["portraits", "related"],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const response = await API.get<PortraitsResponse>(
        "/portraits/my-related"
      );
      return response.data.portraits;
    },
    enabled: !!user,
  });
};
