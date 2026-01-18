"use client";
import { cn } from "@/lib/utils";

type HighlightCardWrapperProps = {
  children?: React.ReactNode;
  className?: string;
};

const HighlightCardWrapper = ({
  children,
  className,
}: HighlightCardWrapperProps) => {
  return (
    <div
      className={cn(
        "rounded-[12px] w-full min-w-[306px] overflow-hidden min-h-[240px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HighlightCardWrapper;
