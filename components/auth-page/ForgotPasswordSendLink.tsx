"use client";
import Link from "next/link";
import FormInput from "@/components/shared/FormInput";
import ThemedButton from "@/components/shared/ThemedButton";
import IconTitleDescriptionCard from "@/components/auth-page/IconTitleDescriptionCard";
import { validateEmail } from "@/utils/validation";
import { MailIcon } from "lucide-react";

type ForgotPasswordSendLinkProps = {
  email?: string;
  emailError?: string;
  isLoading?: boolean;
  onEmailChange?: (value: string) => void;
  onSubmit?: () => void;
};

export const ForgotPasswordSendLink = ({
  email,
  emailError,
  isLoading = false,
  onEmailChange,
  onSubmit,
}: ForgotPasswordSendLinkProps) => {
  const isEmailValid = validateEmail(email);

  return (
    <>
      <IconTitleDescriptionCard
        iconNode={<MailIcon />}
        title="Forgot Password?"
        description="No worries, we'll send you reset instructions"
      />
      <div className="mt-8 p-8 rounded-2xl border border-gray-9 bg-white">
        <FormInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          error={emailError}
          variant="gray"
        />
        <div className="text-gray-8 font-light mt-2">
          We&apos;ll send a password reset link to this email
        </div>
        <ThemedButton
          variant="purple"
          className="mt-4 w-full"
          onClick={onSubmit}
          loading={isLoading}
          disabled={!isEmailValid || isLoading}
        >
          Send Reset Link
        </ThemedButton>
      </div>
      <div className="mt-6 text-center font-light text-gray-8">
        <span>Remember your password? </span>
        <Link
          href="/auth/sign-in"
          className="text-dominant-purple-main hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
};
