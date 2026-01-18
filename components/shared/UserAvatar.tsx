"use client";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASSES = {
  sm: "w-[32px] h-[32px] md:w-[44px] md:h-[44px]",
  md: "w-[32px] h-[32px] md:w-[44px] md:h-[44px]",
  lg: "w-[56px] h-[56px] md:w-[76px] md:h-[76px]",
};

export const UserAvatar = ({
  src,
  name,
  size = "sm",
  className,
}: UserAvatarProps) => {
  const sizeClasses = SIZE_CLASSES[size];

  if (src) {
    return (
      <div
        className={cn(
          "bg-accent-purple-001 flex items-center justify-center shrink-0 rounded-full overflow-hidden",
          sizeClasses,
          className
        )}
      >
        <Image
          src={src}
          alt={name || "User"}
          width={size === "lg" ? 76 : 44}
          height={size === "lg" ? 76 : 44}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-accent-purple-001 flex items-center justify-center shrink-0 rounded-full overflow-hidden",
        sizeClasses,
        className
      )}
    >
      <User className="stroke-dominant-purple-main w-[56%] h-[56%]" />
    </div>
  );
};
