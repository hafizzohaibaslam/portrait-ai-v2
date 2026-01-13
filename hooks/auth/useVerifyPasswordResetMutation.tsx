import { useMutation } from "@tanstack/react-query";
import { verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/firebase/config";
import { toast } from "sonner";

export const useVerifyPasswordResetCodeMutation = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      const email = await verifyPasswordResetCode(auth, code);
      return email;
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid or expired reset link");
    },
  });
};
