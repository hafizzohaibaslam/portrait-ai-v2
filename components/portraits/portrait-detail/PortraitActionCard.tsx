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
        "bg-white p-5 rounded-[16px] cursor-pointer shadow flex flex-col gap-3",
        className
      )}
    >
      <div
        className={cn(
          "w-12 h-12 p-3 rounded-[12px] flex items-center justify-center",
          iconBgColor,
          "[&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-dominant-purple-main"
        )}
      >
        {icon}
      </div>
      <div className="space-y-1">

      <h3 className="font-medium text-[18px] leading-[24px] tracking-0 text-off-black">{title}</h3>
      <p className="font-normal text-[14px] leading-[20px] tracking-0 text-gray-11">{description}</p>
      </div>
    </div>
  );
};

export default PortraitActionCard;
