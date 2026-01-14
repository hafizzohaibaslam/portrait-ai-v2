"use client";
import { cn } from "@/lib/utils";

type HighlightGridProps = {
  children?: React.ReactNode;
  className?: string;
};

const HighlightGrid = ({ children, className }: HighlightGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 *:max-w-[400px] *:mx-auto *:w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HighlightGrid;
