// src/components/auth/sign-in-form.tsx
"use client";

import Link from "next/link";
import FormInput from "@/components/shared/FormInput";
import FormPassword from "@/components/shared/FormPassword";
import ThemedButton from "@/components/shared/ThemedButton";
import SsoButton from "@/components/auth-page/SsoButton";

type SignInFormProps = {
  // Form state (will be connected later)
  email?: string;
  password?: string;
  emailError?: string;
  passwordError?: string;
  isLoading?: boolean;
  // Handlers (will be connected later)
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onSubmit?: () => void;
  onSsoClick?: () => void;
  className?: string;
};

const SignInForm = ({
  email,
  password,
  emailError,
  passwordError,
  isLoading = false,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSsoClick,
  className,
}: SignInFormProps) => {
  return (
    <div className={className}>
      {/* Form Fields */}
      <div className="mt-6 space-y-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={onEmailChange}
          error={emailError}
          variant="white"
        />
        <FormPassword
          label="Password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          onEnter={onSubmit}
          error={passwordError}
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
          variant="black"
          className="mt-5 w-full"
          onClick={onSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Login with Email
        </ThemedButton>

        {/* SSO Button */}
        <SsoButton
          type="sign-in"
          variant="white"
          className="mt-6 w-full"
          onClick={onSsoClick}
        />
      </div>
    </div>
  );
};

export default SignInForm;
