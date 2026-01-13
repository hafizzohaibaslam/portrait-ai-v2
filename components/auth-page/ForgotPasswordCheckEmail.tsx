"use client";
import ThemedButton from "@/components/shared/ThemedButton";
import IconTitleDescriptionCard from "@/components/auth-page/IconTitleDescriptionCard";
import { CheckCircleIcon, MailIcon } from "lucide-react";

type ForgotPasswordCheckEmailProps = {
  email?: string;
  onGoToEmail?: () => void;
  onTryAgain?: () => void;
};

export const ForgotPasswordCheckEmail = ({
  email,
  onGoToEmail,
  onTryAgain,
}: ForgotPasswordCheckEmailProps) => {
  const instructions = [
    `Check your inbox for an email from Portrait AI`,
    `Click the reset password link in the email`,
    `Create a new password for your account`,
  ];

  const handleGoToEmail = () => {
    if (email) {
      const domain = email.split("@")[1] || "gmail.com";
      window.open(`https://${domain}`, "_blank");
    }
    onGoToEmail?.();
  };

  return (
    <>
      <IconTitleDescriptionCard
        iconNode={<MailIcon />}
        badgeIconNode={
          <CheckCircleIcon className="fill-dominant-purple-main" />
        }
        title="Check Your Email"
        description={
          <>
            <span>We&apos;ve sent a password reset link to</span>
            <br />
            <span className="font-medium text-dominant-purple-main">
              {email}
            </span>
          </>
        }
      />
      <div className="mt-8 p-8 rounded-2xl border border-gray-9 bg-white">
        {instructions.map((instruction, i) => (
          <div key={i} className={`${i > 0 ? "mt-4" : ""} flex items-center`}>
            <div className="w-6 h-6 rounded-full bg-purple-7 text-dominant-purple-main flex items-center justify-center text-center font-medium">
              {i + 1}
            </div>
            <div className="pl-4 text-gray-8">{instruction}</div>
          </div>
        ))}
        <div className="h-[2px] bg-gray-9 my-6"></div>
        <ThemedButton
          variant="purple"
          className="mt-4 w-full"
          onClick={handleGoToEmail}
        >
          Go to Email
        </ThemedButton>
      </div>
      <div className="mt-6 p-4 text-center text-gray-8 bg-yellow-3 border border-gray-9 rounded-2xl">
        <span>Didn&apos;t receive the email? Check your spam folder or </span>
        <br />
        <button
          onClick={onTryAgain}
          className="inline-block text-dominant-purple-main hover:underline"
        >
          try again
        </button>
      </div>
    </>
  );
};

export default ForgotPasswordCheckEmail;
