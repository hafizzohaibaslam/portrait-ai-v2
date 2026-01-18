"use client";
import { cn } from "@/lib/utils";
import AppBrand from "@/components/shared/AppBrand";

type AuthHeaderProps = {
  className?: string;
};

const AuthHeader = ({ className }: AuthHeaderProps) => {
  return (
    <header
      className={cn(
        "bg-purple-4 sticky top-0 z-1 p-5 lg:px-12 lg:py-6 flex items-center justify-center lg:justify-start border-b-2 border-b-gray-1 lg:border-none",
        className
      )}
    >
      <AppBrand />
    </header>
  );
};

export default AuthHeader;
