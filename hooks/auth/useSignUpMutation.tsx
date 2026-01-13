"use client";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { auth } from "@/firebase/config";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";
import type { User } from "@/types/global-types";
import { useRouter } from "next/navigation";

export const useSignUpMutation = () => {
  const router = useRouter();

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
      // Force token refresh to ensure fresh token
      await userCredential.user.getIdToken(true);
      return { email, name, phone_number };
    },
    onSuccess: async ({ email, name, phone_number }) => {
      const body: User = { email, name, phone_number };
      await API.post<{ message: string; user: User }>("/users/create", body);
      await signOut(auth);
      toast.success("Account created successfully");
      localStorage.setItem("newUser", "true");
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
