// src/components/auth/sign-in-form.tsx
"use client";

import Link from "next/link";
import FormInput from "@/components/shared/FormInput";
import FormPassword from "@/components/shared/FormPassword";
import ThemedButton from "@/components/shared/ThemedButton";
import SsoButton from "@/components/auth-page/SsoButton";
import { toast } from "sonner";
import { useSignInMutation } from "@/hooks/auth/useSignInMutation";

type SignInFormProps = {
  className?: string;
};

const SignInForm = ({ className }: SignInFormProps) => {
  const { mutate: signInMutation, isPending } = useSignInMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    signInMutation({ email, password });
  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Form Fields */}
      <div className="mt-6 space-y-4">
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
      </div>

      {/* Forgot Password Link */}
      <Link
        href="/auth/forgot-password"
        className="font-light text-off-gray text-end mt-2 hover:underline hover:text-off-black block"
      >
        Forgot Password?
      </Link>

      {/* Submit Button */}
      <div className="mt-5 font-medium">
        <ThemedButton
          type="submit"
          variant="black"
          className="mt-5 w-full"
          loading={isPending}
          disabled={isPending}
        >
          Login with Email
        </ThemedButton>

        {/* SSO Button */}
        <SsoButton type="sign-in" variant="white" className="mt-6 w-full" />
      </div>
    </form>
  );
};

export default SignInForm;
