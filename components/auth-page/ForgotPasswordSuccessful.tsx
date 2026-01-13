"use client";
import { ArrowRight, Circle } from "lucide-react";
import Link from "next/link";
import ThemedButton from "@/components/shared/ThemedButton";
import IconTitleDescriptionCard from "@/components/auth-page/IconTitleDescriptionCard";
import { CheckCircleIcon } from "lucide-react";

const ForgotPasswordResetSuccessful = () => {
  const tips = [
    `Keep your password secure and don't share it`,
    `Use a unique password for Portrait AI`,
    `Consider using a password manager`,
  ];

  return (
    <>
      <IconTitleDescriptionCard
        iconNode={<CheckCircleIcon />}
        title="Password Reset Successful!"
        description="Your password has been successfully reset"
      />
      <div className="mt-8 p-8 rounded-2xl border border-gray-9 bg-white">
        <div className="text-center max-w-[274px] mx-auto">
          You can now sign in to your account with your new password.
        </div>
        <div className="h-[2px] bg-gray-9 my-6"></div>
        <div className="mt-6 p-4 text-gray-8 bg-yellow-3 border border-gray-9 rounded-2xl">
          <div className="font-medium mb-4">Security Tips:</div>
          {tips.map((tip, i) => (
            <div key={i} className={`${i > 0 ? "mt-3" : ""} flex items-center`}>
              <Circle className="fill-dominant-purple-main w-[5px] h-[5px]" />
              <div className="pl-2 text-gray-8">{tip}</div>
            </div>
          ))}
        </div>
        <ThemedButton
          variant="purple"
          href="/auth/sign-in"
          className="mt-6 w-full flex items-center justify-center"
        >
          <span className="pr-4">Sign In to Your Account</span>
          <ArrowRight />
        </ThemedButton>
      </div>
      <div className="mt-6 text-center">
        <span>Having trouble? </span>
        <Link
          href="/contact/support"
          className="text-dominant-purple-main hover:underline"
        >
          Contact Support
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordResetSuccessful;
