"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
      <Link
        href="/"
        className="flex items-center font-semibold text-lg lg:text-2xl"
      >
        <Image
          src="/images/icon-app-icon.png"
          alt="Portrait AI"
          width={32}
          height={32}
          className="w-6 lg:w-8"
        />
        <span className="pl-1 lg:pl-2">Portrait AI</span>
      </Link>
    </header>
  );
};

export default AuthHeader;
