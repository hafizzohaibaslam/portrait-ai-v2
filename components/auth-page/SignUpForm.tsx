// src/components/auth/sign-up-form.tsx
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

type SignUpFormProps = {
  // Form state
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  // Errors
  nameError?: string;
  phoneError?: string;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  // Loading
  isLoading?: boolean;
  // Handlers
  onNameChange?: (value: string) => void;
  onPhoneChange?: (value: string) => void;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onSubmit?: () => void;
  onSsoClick?: () => void;
  className?: string;
};

const SignUpForm = ({
  name,
  phone,
  email,
  password,
  confirmPassword,
  nameError,
  phoneError,
  emailError,
  passwordError,
  confirmPasswordError,
  isLoading = false,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onSsoClick,
  className,
}: SignUpFormProps) => {
  return (
    <div className={className}>
      {/* Form Fields */}
      <div className="space-y-4">
        <FormInput
          label="Full Name"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={onNameChange}
          error={nameError}
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
          value={phone}
          onChange={onPhoneChange}
          error={phoneError}
          variant="white"
        />

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
          error={passwordError}
          variant="white"
        />

        <FormPassword
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={confirmPasswordError}
          variant="white"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-5 font-medium">
        <ThemedButton
          variant="black"
          className="mt-5 w-full"
          onClick={onSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Continue with Email
        </ThemedButton>

        {/* SSO Button */}
        <SsoButton
          type="sign-up"
          variant="white"
          className="mt-6 w-full"
          onClick={onSsoClick}
        />
      </div>
    </div>
  );
};

export default SignUpForm;
