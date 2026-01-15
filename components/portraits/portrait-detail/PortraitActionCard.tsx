"use client";

import { cn } from "@/lib/utils";

type PortraitActionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
  onClick?: () => void;
  className?: string;
};

const PortraitActionCard = ({
  icon,
  title,
  description,
  iconBgColor = "bg-accent-purple-001",
  onClick,
  className,
}: PortraitActionCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white p-5 rounded-2xl text-left border-2 border-white hover:border-dominant-purple-main cursor-pointer shadow-sm hover:shadow-md transition-ease",
        className
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          iconBgColor,
          "[&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-dominant-purple-main"
        )}
      >
        {icon}
      </div>
      <div className="mt-4 font-bold text-lg text-off-black">{title}</div>
      <div className="mt-1 text-sm text-gray-500 font-light">{description}</div>
    </div>
  );
};

export default PortraitActionCard;
