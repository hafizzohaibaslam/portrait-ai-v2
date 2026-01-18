"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fieldWrapperVariants = cva(
  "flex items-center p-4 rounded-lg border border-gray-4",
  {
    variants: {
      variant: {
        white: "bg-white",
        gray: "bg-gray-01",
      },
    },
    defaultVariants: {
      variant: "white",
    },
  }
);

type FieldWrapperVariant = VariantProps<typeof fieldWrapperVariants>["variant"];

type FormFieldWrapperProps = {
  variant?: FieldWrapperVariant;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  children: React.ReactNode;
};

const FormFieldWrapper = ({
  variant,
  disabled,
  error,
  className,
  children,
}: FormFieldWrapperProps) => {
  return (
    <div
      className={cn(
        fieldWrapperVariants({ variant }),
        disabled && "cursor-not-allowed",
        error && "border-red-1",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormFieldWrapper;
export type { FieldWrapperVariant };
