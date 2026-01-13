"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { auth } from "@/firebase/config";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";
import type { User } from "@/types/global-types";

export const useSignUpMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      name,
      phone_number,
    }: {
      email: string;
      password: string;
      name: string;
      phone_number?: string;
    }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken(true);
      return { token, email, name, phone_number };
    },
    onSuccess: async ({ token, email, name, phone_number }) => {
      // Create user in backend
      const body: User = { email, name, phone_number };
      const response = await API.post<{ message: string; user: User }>(
        "/users/create",
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      queryClient.setQueryData(["auth", "me"], response.data.user);
      toast.success("Account created successfully");
      router.push("/auth/sign-in");
    },
    onError: (error: unknown) => {
      const errorMessage = getFirebaseErrorMessage(
        error,
        "Failed to create account. Please try again"
      );
      toast.error(errorMessage);
    },
  });
};
