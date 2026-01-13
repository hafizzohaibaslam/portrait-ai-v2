"use client";
import Image from "next/image";
import ThemedButton from "@/components/shared/ThemedButton";
import { cn } from "@/lib/utils";

type SsoButtonProps = {
  type?: "sign-in" | "sign-up";
  variant?: "white" | "black" | "purple" | "yellow-light";
  onClick?: () => void;
  className?: string;
};

const SsoButton = ({
  type = "sign-in",
  variant = "white",
  onClick,
  className,
}: SsoButtonProps) => {
  const label = type === "sign-up" ? "Continue" : "Login";

  return (
    <ThemedButton
      variant={variant}
      onClick={onClick}
      className={cn("flex items-center justify-center", className)}
    >
      <Image
        src="/images/icon-google-colored.png"
        alt="Google"
        width={24}
        height={24}
        className="w-6 h-auto"
      />
      <span className="pl-2">{label} with Google</span>
    </ThemedButton>
  );
};

export default SsoButton;
