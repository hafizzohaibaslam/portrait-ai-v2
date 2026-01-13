import { User } from "@/types/global-types";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { useAuthContext } from "@/providers/AuthContext";

export const useAuthMeQuery = () => {
  const { firebaseUser } = useAuthContext();

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      if (!firebaseUser) throw new Error("Not authenticated");
      const token = await firebaseUser.getIdToken();
      const response = await API.get<User>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!firebaseUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export default useAuthMeQuery;
