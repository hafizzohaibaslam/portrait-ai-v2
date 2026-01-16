"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SettingsSectionProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  titleRightNode?: ReactNode;
  children: ReactNode;
  className?: string;
};

const SettingsSection = ({
  icon,
  title,
  subtitle,
  titleRightNode,
  children,
  className,
}: SettingsSectionProps) => {
  return (
    <section
      className={cn(
        "border border-gray-1 rounded-3xl p-6 bg-white shadow-sm",
        className
      )}
    >
      <div className="flex items-start gap-4 mb-8">
        <div className="*:w-[20px] *:h-[20px] md:*:w-[24px] md:*:h-[24px] rounded-xl p-2 md:p-3 bg-accent-purple-001 *:stroke-dominant-purple-main">
          {icon}
        </div>
        <div className="flex-1 flex flex-col lg:flex-row gap-2 lg:gap-0 items-start justify-between">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-black-004">{subtitle}</p>
          </div>
          {titleRightNode}
        </div>
      </div>
      {children}
    </section>
  );
};

export default SettingsSection;
