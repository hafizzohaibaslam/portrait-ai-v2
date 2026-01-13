"use client";
import AuthHeader from "@/components/auth-page/AuthHeader";
import IntroVideoButton from "@/components/auth-page/IntroVideoButton";
import AuthFooterLink from "@/components/auth-page/AuthFooterLink";
import AuthVideoSidebar from "@/components/auth-page/AuthVideoSidebar";
import SignInForm from "@/components/auth-page/SignInForm";

export default function SignInPage() {
  return (
    <div className="bg-purple-4 flex h-screen overflow-y-auto">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col">
        <AuthHeader />
        <div className="px-5 py-10 md:px-12 pb-12 flex-1 flex flex-col max-w-[530px] w-full mx-auto justify-center">
          <h1 className="text-center text-3xl">Welcome Back</h1>
          <p className="text-center mt-1 text-off-gray">
            Log in to uncover and relive your exciting memories!
          </p>
          <IntroVideoButton className="mt-6 mb-4" />
          <SignInForm />
          <AuthFooterLink type="sign-in" className="mt-12" />
        </div>
      </div>
      {/* Right Side - Video */}
      <AuthVideoSidebar />
    </div>
  );
}
