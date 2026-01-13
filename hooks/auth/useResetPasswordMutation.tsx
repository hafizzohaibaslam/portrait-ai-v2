import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firebase/config";
import { toast } from "sonner";

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      code,
      newPassword,
    }: {
      code: string;
      newPassword: string;
    }) => {
      await confirmPasswordReset(auth, code, newPassword);
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/auth/sign-in");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
};
