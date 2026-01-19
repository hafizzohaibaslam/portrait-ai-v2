"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { useAuthContext } from "@/providers/AuthContext";
import type { Memory } from "@/types/memory-types";

export const useGetMemoryById = (memoryId: string | null) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["memory", memoryId],
    queryFn: async () => {
      const response = await API.get<Memory>(`/memories/${memoryId}`);
      return response.data;
    },
    enabled: !!user && !!memoryId,
  });
};
