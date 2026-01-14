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
        "rounded-2xl overflow-hidden min-h-[240px] lg:min-h-[300px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HighlightCardWrapper;
