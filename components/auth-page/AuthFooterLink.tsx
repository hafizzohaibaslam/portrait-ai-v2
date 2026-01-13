"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type AuthFooterLinkProps = {
  type: "sign-in" | "sign-up";
  className?: string;
};

const AuthFooterLink = ({ type, className }: AuthFooterLinkProps) => {
  const isSignUp = type === "sign-up";

  return (
    <div className={cn("text-center", className)}>
      <span className="text-off-gray font-light">
        {isSignUp ? "Don't have an account? " : "Already have an account? "}
      </span>
      <Link
        href={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}
        className="hover:underline"
      >
        {isSignUp ? "Sign In" : "Sign Up"}
      </Link>
    </div>
  );
};

export default AuthFooterLink;
