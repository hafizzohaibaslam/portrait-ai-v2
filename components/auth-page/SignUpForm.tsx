"use client";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FormInput from "@/components/shared/FormInput";
import FormPassword from "@/components/shared/FormPassword";
import ThemedButton from "@/components/shared/ThemedButton";
import SsoButton from "@/components/auth-page/SsoButton";
import { useSignUpMutation } from "@/hooks/auth/useSignUpMutation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SignUpFormProps = {
  className?: string;
};

const SignUpForm = ({ className }: SignUpFormProps) => {
  const { mutate: signUpMutation, isPending } = useSignUpMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const name = formData.get("name") as string;
    const phone_number = formData.get("phone_number") as string;

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (confirmPassword.trim() !== password.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    signUpMutation({ email, password, name, phone_number });
  };
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
      {/* Form Fields */}
      <div className="space-y-3">
        <FormInput
          label="Full Name"
          type="text"
          placeholder="Full Name"
          name="name"
          variant="white"
        />

        <FormInput
          label={
            <div className="flex items-center">
              <span>Phone Number (Optional)</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="ml-2 cursor-pointer"
                      aria-label="Phone number info"
                    >
                      <Info className="w-4 h-4 text-gray-8" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white! border border-accent-purple-001 text-off-black! max-w-[200px] p-3 rounded-md">
                    <span>
                      We use your number to only notify you of updates.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          }
          type="tel"
          placeholder="Phone Number"
          name="phone_number"
          variant="white"
        />

        <FormInput
          label="Email"
          type="email"
          placeholder="Email Address"
          name="email"
          variant="white"
        />

        <FormPassword
          label="Password"
          placeholder="Password"
          name="password"
          variant="white"
        />

        <FormPassword
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          variant="white"
        />
      </div>

      {/* Submit Button */}
      <div className="font-medium space-y-6">
        <ThemedButton
          variant="black"
          className="mt-5 w-full"
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          Continue with Email
        </ThemedButton>

        {/* SSO Button */}
        <SsoButton type="sign-up" variant="white" className="w-full" />
      </div>
    </form>
  );
};

export default SignUpForm;
