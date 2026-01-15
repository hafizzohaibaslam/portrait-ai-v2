"use client";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { useAuthContext } from "@/providers/AuthContext";
import type { Portrait } from "@/types/portrait-types";
import type { Memory } from "@/types/memory-types";

type PortraitResponse = Portrait & {
  memories_count?: number;
  memories?: Memory[];
};

export const useGetPortraitById = (portrait_id: string | null) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["portrait", portrait_id],
    queryFn: async () => {
      const response = await API.get<PortraitResponse>(
        `/portraits/${portrait_id}`
      );
      return response.data;
    },
    enabled: !!user && !!portrait_id,
  });
};
