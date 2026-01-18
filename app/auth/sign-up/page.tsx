"use client";

import Link from "next/link";
import AuthHeader from "@/components/auth-page/AuthHeader";
import IntroVideoButton from "@/components/auth-page/IntroVideoButton";
import AuthFooterLink from "@/components/auth-page/AuthFooterLink";
import AuthVideoSidebar from "@/components/auth-page/AuthVideoSidebar";
import SignUpForm from "@/components/auth-page/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="bg-purple-4 flex h-screen overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <AuthHeader />
        <div className="flex-1 flex flex-col gap-5 max-w-[400px] w-full mx-auto justify-center pb-1">
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="font-normal text-[32px] leading-[40px] tracking-[-3%] text-off-black text-center">
                Create an account
              </h1>
              <p className="font-light text-[16px] leading-[28px] tracking-[-3%] text-off-gray text-center">
                Great memories awaits discovery and exploration
              </p>
            </div>
            <IntroVideoButton />
          </div>
          <div className="space-y-6">
            <SignUpForm />
            {/* Terms and Privacy */}
            <div className="text-center font-light text-[16px] leading-[24px] tracking-[3%] text-off-gray">
              <span>By continuing, you agree to Portrait AI&apos;s </span>
              <Link
                href="/policy/terms"
                className="hover:underline text-off-black"
              >
                Terms of Use
              </Link>
              <span> and acknowledge our </span>
              <Link
                href="/policy/privacy"
                className="hover:underline text-off-black"
              >
                Privacy Policy.
              </Link>
            </div>
            <AuthFooterLink type="sign-up" className="" />
          </div>
        </div>
      </div>
      {/* Right Side - Video */}
      <AuthVideoSidebar />
    </div>
  );
};

export default SignUpPage;
