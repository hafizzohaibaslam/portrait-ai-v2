"use client";

import Link from "next/link";
import AuthHeader from "@/components/auth-page/AuthHeader";
import IntroVideoButton from "@/components/auth-page/IntroVideoButton";
import AuthFooterLink from "@/components/auth-page/AuthFooterLink";
import AuthVideoSidebar from "@/components/auth-page/AuthVideoSidebar";
import SignUpForm from "@/components/auth-page/SignUpForm";

export default function SignUpPage() {
  // TODO: Connect to auth context
  const handleNameChange = (value: string) => {};
  const handlePhoneChange = (value: string) => {};
  const handleEmailChange = (value: string) => {};
  const handlePasswordChange = (value: string) => {};
  const handleConfirmPasswordChange = (value: string) => {};
  const handleSubmit = () => {};
  const handleSsoClick = () => {};

  return (
    <div className="bg-purple-4 flex !h-[100dvh] h-[100vh] overflow-y-auto">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col">
        <AuthHeader />
        <div className="px-5 py-10 md:px-12 pb-12 flex-1 flex flex-col max-w-[530px] w-full mx-auto justify-center">
          <h1 className="text-center text-3xl">Create an account</h1>
          <p className="text-center mt-1 text-off-gray">
            Great memories awaits discovery and exploration
          </p>
          <IntroVideoButton className="mt-6 mb-4" />
          <SignUpForm
            onNameChange={handleNameChange}
            onPhoneChange={handlePhoneChange}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
            onSubmit={handleSubmit}
            onSsoClick={handleSsoClick}
          />
          {/* Terms and Privacy */}
          <div className="text-center mt-8 max-w-[366px] mx-auto">
            <span className="text-off-gray font-light">
              By continuing, you agree to Portrait AI&apos;s{" "}
            </span>
            <Link href="/policy/terms" className="hover:underline">
              Terms of Use
            </Link>
            <span className="text-off-gray font-light">
              {" "}
              and acknowledge our{" "}
            </span>
            <Link href="/policy/privacy" className="hover:underline">
              Privacy Policy.
            </Link>
          </div>
          <AuthFooterLink type="sign-up" className="mt-12" />
        </div>
      </div>
      {/* Right Side - Video */}
      <AuthVideoSidebar />
    </div>
  );
}
