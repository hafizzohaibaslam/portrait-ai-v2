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
        "rounded-[12px] w-full min-w-[306px] overflow-hidden border border-gray-3 p-3 flex flex-col gap-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PortraitCardWrapper;
