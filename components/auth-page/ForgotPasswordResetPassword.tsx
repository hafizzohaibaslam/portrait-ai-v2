"use client";
import {
  CheckCircle,
  CircleX,
  Link as LinkIcon,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import FormPassword from "@/components/shared/FormPassword";
import ThemedButton from "@/components/shared/ThemedButton";
import IconTitleDescriptionCard from "@/components/auth-page/IconTitleDescriptionCard";
import { LockIcon } from "lucide-react";
import { validatePassword } from "@/utils/validation";

type ForgotPasswordResetPasswordProps = {
  newPassword?: string;
  confirmPassword?: string;
  newPasswordError?: string;
  confirmPasswordError?: string;
  isLoading?: boolean;
  verificationCode?: string;
  onNewPasswordChange?: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onSubmit?: () => void;
  onVerifyCode?: (code: string) => Promise<void>;
};

const ForgotPasswordResetPassword = ({
  newPassword,
  confirmPassword,
  newPasswordError,
  confirmPasswordError,
  isLoading = false,
  verificationCode,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onVerifyCode,
}: ForgotPasswordResetPasswordProps) => {
  const [verifyState, setVerifyState] = useState({
    loading: true,
    success: false,
    error: "",
  });

  useEffect(() => {
    const verifyCode = async () => {
      if (verificationCode && onVerifyCode) {
        try {
          await onVerifyCode(verificationCode);
          setVerifyState({ loading: false, success: true, error: "" });
        } catch (error: unknown) {
          console.error("Link Verification Error:", error);
          setVerifyState({
            loading: false,
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Invalid or expired link.",
          });
        }
      } else {
        setVerifyState({
          loading: false,
          success: false,
          error: "No verification code found.",
        });
      }
    };

    verifyCode();
  }, [verificationCode, onVerifyCode]);

  const passwordValidation = validatePassword(newPassword || "");
  const passwordMatches =
    !!newPassword && !!confirmPassword && newPassword === confirmPassword;

  const instructions = [
    {
      label: "At least 8 characters",
      valid: passwordValidation.isAtLeast8Chars,
    },
    {
      label: "At least one uppercase letter",
      valid: passwordValidation.hasUpperCase,
    },
    {
      label: "At least one lowercase letter",
      valid: passwordValidation.hasLowerCase,
    },
    {
      label: "Confirmed password matches",
      valid: passwordMatches,
    },
  ];

  const isFormValid = passwordValidation.valid && passwordMatches;

  if (!verifyState.success) {
    return (
      <IconTitleDescriptionCard
        iconNode={
          verifyState.loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <LinkIcon />
          )
        }
        title={verifyState.loading ? "Verifying Link" : "Reset Link"}
        description={
          verifyState.loading
            ? "Please wait while we verify the reset link."
            : verifyState.success
            ? "The reset link was successfully verified."
            : "We couldn't verify the reset link. It may be invalid or expired."
        }
      />
    );
  }

  return (
    <>
      <IconTitleDescriptionCard
        iconNode={<LockIcon />}
        title="Reset Password"
        description="Create a new secure password for your account"
      />
      <div className="mt-8 p-8 rounded-2xl border border-gray-9 bg-white">
        <FormPassword
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={onNewPasswordChange}
          error={newPasswordError}
          variant="gray"
        />
        <FormPassword
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={confirmPasswordError}
          variant="gray"
          className="mt-4"
        />
        <div className="mt-6 p-4 text-gray-8 bg-yellow-3 border border-gray-9 rounded-2xl">
          <div className="font-medium mb-4">Password must contain:</div>
          {instructions.map((instruction, i) => (
            <div
              key={i}
              className={`${i > 0 ? "mt-2" : ""} flex items-center ${
                instruction.valid
                  ? "text-green-1 *:stroke-green-1"
                  : "text-gray-8"
              }`}
            >
              <div className="*:w-4 *:h-4">
                {instruction.valid ? <CheckCircle /> : <CircleX />}
              </div>
              <div className="pl-2">{instruction.label}</div>
            </div>
          ))}
        </div>
        <ThemedButton
          variant="purple"
          className="mt-4 w-full"
          onClick={onSubmit}
          loading={isLoading}
          disabled={!isFormValid || isLoading}
        >
          Reset Password
        </ThemedButton>
      </div>
      <div className="mt-6 text-center font-light text-gray-8">
        🔒 Your password is encrypted and secure
      </div>
    </>
  );
};

export default ForgotPasswordResetPassword;
