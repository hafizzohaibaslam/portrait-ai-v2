"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ResponsiveChipProps = {
  leadingNode: React.ReactNode;
  text: React.ReactNode;
  href?: string;
  onClick?: () => void;
  showTextOnMobile?: boolean;
  textClassName?: string;
  className?: string;
};

const ResponsiveChip = ({
  leadingNode,
  text,
  href,
  onClick,
  showTextOnMobile = false,
  textClassName,
  className,
}: ResponsiveChipProps) => {
  const content = (
    <div
      className={cn(
        "w-fit flex items-center",
        "lg:shadow-md lg:shadow-black/8",
        "p-2 lg:px-6 lg:py-3",
        "rounded-full",
        "border-[1.5px] border-gray-4",
        "bg-white",
        "transition-ease cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="stroke-dominant-purple-main fill-dominant-purple-main">
        {leadingNode}
      </div>
      <div
        className={cn(
          "text-dominant-purple-main",
          showTextOnMobile ? "ml-2" : "hidden lg:block",
          "lg:ml-3",
          textClassName
        )}
      >
        {text}
      </div>
    </div>
  );

  if (href && !onClick) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default ResponsiveChip;
