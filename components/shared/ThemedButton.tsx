// src/components/shared/themed-button.tsx
"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Button theme variants using CVA
const buttonThemeVariants = cva(
  "text-center px-12 py-2 lg:px-8 lg:py-3 border-[1.5px] transition-ease",
  {
    variants: {
      variant: {
        black:
          "border-off-black bg-off-black text-white hover:bg-white hover:text-off-black",
        purple:
          "border-dominant-purple-main bg-dominant-purple-main text-white hover:bg-white hover:text-dominant-purple-main",
        white: "border-gray-4 bg-white hover:bg-off-black hover:text-white",
        "yellow-light":
          "border-off-black bg-yellow-4 hover:bg-off-black hover:text-white",
        destructive:
          "border-red-1 bg-red-1 text-white hover:bg-white hover:text-red-1",
      },
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        "4xl": "rounded-4xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "black",
      rounded: "lg",
    },
  }
);

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonThemeVariants>["variant"]
>;
type ButtonRounded = NonNullable<
  VariantProps<typeof buttonThemeVariants>["rounded"]
>;

// Base props shared by both button and link
type BaseThemedButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

// Discriminated union for button vs link
type ThemedButtonProps = BaseThemedButtonProps &
  (
    | {
        href: string;
        onClick?: () => void;
        type?: never;
      }
    | {
        href?: never;
        onClick?: () => void;
        type?: "button" | "submit" | "reset";
      }
  );

const ThemedButton = ({
  children,
  variant,
  rounded,
  loading = false,
  disabled = false,
  className,
  href,
  onClick,
  type = "button",
}: ThemedButtonProps) => {
  const isDisabled = disabled || loading;

  const buttonClasses = cn(
    buttonThemeVariants({ variant, rounded }),
    loading && "opacity-80 min-w-[200px]",
    className
  );

  const content = loading ? (
    <Loader2 className="animate-spin mx-auto scale-[1.2]" />
  ) : (
    children
  );

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={isDisabled ? undefined : onClick}
        aria-disabled={isDisabled}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
};

// Export types
export type { ThemedButtonProps, ButtonVariant, ButtonRounded };
export default ThemedButton;
