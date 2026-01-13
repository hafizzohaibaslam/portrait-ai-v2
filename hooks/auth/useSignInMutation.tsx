"use client";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { auth } from "@/firebase/config";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";
import Cookie from "js-cookie";

export const useSignInMutation = () => {
  const router = useRouter();

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
      // Force token refresh to ensure fresh token
      await userCredential.user.getIdToken(true);
      Cookie.set("fb_user_id", userCredential.user.uid);
      return userCredential.user;
    },
    onSuccess: () => {
      toast.success("Signed in successfully");
      if (localStorage.getItem("newUser")) {
        router.push("/onboarding");
      } else {
        router.push("/home");
      }
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
