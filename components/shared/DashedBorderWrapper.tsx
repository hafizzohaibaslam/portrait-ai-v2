"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type DashedBorderWrapperProps = {
  borderRadius?: number;
  backgroundImage?: string;
  borderColorTheme?: "primary";
  children?: React.ReactNode;
  divProps?: HTMLAttributes<HTMLDivElement>;
  className?: string;
};

const DashedBorderWrapper = ({
  borderRadius = 24,
  backgroundImage,
  borderColorTheme,
  children,
  divProps,
  className,
}: DashedBorderWrapperProps) => {
  const stroke = borderColorTheme === "primary" ? "%23673147" : "%23333";

  const defaultBackground = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${borderRadius}' ry='${borderRadius}' stroke='${stroke}' stroke-width='4' stroke-dasharray='8.8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`;

  return (
    <div
      {...divProps}
      style={{
        borderRadius,
        backgroundImage: backgroundImage || defaultBackground,
      }}
      className={cn(className)}
    >
      {children}
    </div>
  );
};

export default DashedBorderWrapper;
