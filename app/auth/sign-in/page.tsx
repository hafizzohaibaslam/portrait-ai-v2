"use client";
import AuthHeader from "@/components/auth-page/AuthHeader";
import IntroVideoButton from "@/components/auth-page/IntroVideoButton";
import AuthFooterLink from "@/components/auth-page/AuthFooterLink";
import AuthVideoSidebar from "@/components/auth-page/AuthVideoSidebar";
import SignInForm from "@/components/auth-page/SignInForm";

const SignInPage = () => {
  return (
    <div className="bg-purple-4 flex h-screen overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <AuthHeader />
        <div className="flex-1 flex flex-col max-w-[400px] w-full mx-auto justify-center pb-1">
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="font-normal text-[32px] leading-[40px] tracking-[-3%] text-off-black text-center">
                Welcome Back
              </h1>
              <p className="font-light text-[16px] leading-[28px] tracking-[-3%] text-off-gray text-center">
                Log in to uncover and relive your exciting memories!
              </p>
            </div>
            <IntroVideoButton />
          </div>
          <div className="space-y-6">
            <SignInForm />
            <AuthFooterLink type="sign-in" className="" />
          </div>
        </div>
      </div>
      {/* Right Side - Video */}
      <AuthVideoSidebar />
    </div>
  );
};

export default SignInPage;
