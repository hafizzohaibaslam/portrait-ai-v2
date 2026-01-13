import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { toast } from "sonner";

export const useSendPasswordResetEmailMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/auth/forgot-password`,
        handleCodeInApp: true,
      });
    },
    onSuccess: () => {
      toast.success("Password reset email sent");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });
};
