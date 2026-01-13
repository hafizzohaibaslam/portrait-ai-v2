"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AuthHeader from "@/components/auth-page/AuthHeader";
import { ForgotPasswordSendLink } from "@/components/auth-page/ForgotPasswordSendLink";
import ForgotPasswordCheckEmail from "@/components/auth-page/ForgotPasswordCheckEmail";
import ForgotPasswordResetPassword from "@/components/auth-page/ForgotPasswordResetPassword";
import ForgotPasswordResetSuccessful from "@/components/auth-page/ForgotPasswordSuccessful";
import { useState } from "react";

const ForgotPasswordPage = () => {
  // TODO: Connect to auth context
  const [step, setStep] = useState(0); // 0: Send Link, 1: Check Email, 2: Reset Password, 3: Success
  const [email, setEmail] = useState(""); // From context
  const verificationCode = ""; // From URL params

  const handleEmailChange = (value: string) => {
    // Connect to context
  };

  const handleSubmit = () => {
    // Connect to context
  };

  const handleGoToEmail = () => {
    // Optional handler
  };

  const handleTryAgain = () => {
    // Connect to context - go back to step 0
  };

  const handleVerifyCode = async (code: string) => {
    // Connect to Firebase verifyPasswordResetCode
  };

  return (
    <div className="h-screen overflow-y-auto bg-linear-to-b from-purple-7 via-white to-yellow-3">
      <AuthHeader className="bg-purple-7" />
      <div className="px-5 py-10 md:px-12 pb-12 max-w-[540px] mx-auto">
        {step !== 3 && (
          <Link
            href="/auth/sign-in"
            className="mb-10 hover:underline flex items-center text-gray-8"
          >
            <ArrowLeft className="stroke-gray-8 w-4 h-4" />
            <span className="ml-2">Back to Sign In</span>
          </Link>
        )}
        {step === 0 && (
          <ForgotPasswordSendLink
            email={email}
            onEmailChange={handleEmailChange}
            onSubmit={handleSubmit}
          />
        )}
        {step === 1 && (
          <ForgotPasswordCheckEmail
            email={email}
            onGoToEmail={handleGoToEmail}
            onTryAgain={handleTryAgain}
          />
        )}
        {step === 2 && (
          <ForgotPasswordResetPassword
            verificationCode={verificationCode}
            onVerifyCode={handleVerifyCode}
            onSubmit={handleSubmit}
          />
        )}
        {step === 3 && <ForgotPasswordResetSuccessful />}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
