"use client";

import { cn } from "@/lib/utils";

type PortraitCardWrapperProps = {
  children?: React.ReactNode;
  className?: string;
};

const PortraitCardWrapper = ({
  children,
  className,
}: PortraitCardWrapperProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-gray-3 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PortraitCardWrapper;
