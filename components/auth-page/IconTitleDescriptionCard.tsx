"use client";
import { cn } from "@/lib/utils";

type IconTitleDescriptionCardProps = {
  iconNode: React.ReactNode;
  badgeIconNode?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
};

const IconTitleDescriptionCard = ({
  iconNode,
  badgeIconNode,
  title,
  description,
  className,
}: IconTitleDescriptionCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className
      )}
    >
      <div className="relative w-fit h-fit box-content [&>svg:nth-child(1)]:stroke-dominant-purple-main [&>svg:nth-child(1)]:w-8 [&>svg:nth-child(1)]:h-8 p-4 rounded-full bg-purple-7 border border-dominant-purple-main/20">
        {iconNode}
        {badgeIconNode && (
          <div className="absolute right-[-5px] top-[-5px] w-fit h-fit box-content [&>svg:nth-child(1)]:stroke-dominant-purple-main [&>svg:nth-child(1)]:w-6 [&>svg:nth-child(1)]:h-6">
            {badgeIconNode}
          </div>
        )}
      </div>
      <div className="mt-4 font-medium">{title}</div>
      <div className="mt-2 text-gray-8">{description}</div>
    </div>
  );
};

export default IconTitleDescriptionCard;
