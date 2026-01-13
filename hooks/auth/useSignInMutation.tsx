"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { auth } from "@/firebase/config";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";
import type { User } from "@/types/global-types";

export const useSignInMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken(true);
      return token;
    },
    onSuccess: async (token) => {
      // Fetch user data
      const response = await API.get<User>("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      queryClient.setQueryData(["auth", "me"], response.data);
      toast.success("Signed in successfully");
      // router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const errorMessage = getFirebaseErrorMessage(
        error,
        "Failed to sign in. Please try again"
      );
      toast.error(errorMessage);
    },
  });
};
