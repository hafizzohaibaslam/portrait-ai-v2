"use client";

import { cn } from "@/lib/utils";

type PortraitGridProps = {
  children?: React.ReactNode;
  className?: string;
};

const PortraitGrid = ({ children, className }: PortraitGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PortraitGrid;
