import { auth } from "@/firebase/config";
import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { User } from "@/types/global-types";

export const useGoogleSignInMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      return { token, user: result.user };
    },
    onSuccess: async ({ token, user: firebaseUser }) => {
      try {
        // Try to fetch user data (user might already exist)
        const response = await API.get<{ user: User }>("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        queryClient.setQueryData(["auth", "me"], response.data.user);
        toast.success("Signed in successfully");
        router.push("/dashboard");
      } catch (error: any) {
        // User doesn't exist, create account
        if (error.response?.status === 404) {
          const body: Omit<User, "user_id"> = {
            email: firebaseUser.email || undefined,
            name: firebaseUser.displayName || undefined,
          };
          const createResponse = await API.post<{ user: User }>(
            "/users/create",
            body,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          queryClient.setQueryData(["auth", "me"], createResponse.data.user);
          toast.success("Account created successfully");
          router.push("/dashboard");
        } else {
          throw error;
        }
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to sign in with Google");
    },
  });
};
