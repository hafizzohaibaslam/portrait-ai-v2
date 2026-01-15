"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { useAuthContext } from "@/providers/AuthContext";
import type { Portrait } from "@/types/portrait-types";

type PortraitsResponse = {
  portraits: Portrait[];
  count?: number;
};

export const useGetAllRelatedPortraits = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["portraits", "related"],
    queryFn: async () => {
      const response = await API.get<PortraitsResponse>(
        "/portraits/my-related"
      );
      return response.data.portraits;
    },
    enabled: !!user,
  });
};
