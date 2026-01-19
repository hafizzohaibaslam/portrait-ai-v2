"use client";

import type { Portrait } from "@/types/portrait-types";
import { cn } from "@/lib/utils";

type PortraitHeroInfoProps = {
  portrait: Portrait;
  className?: string;
};

const PortraitHeroInfo = ({ portrait, className }: PortraitHeroInfoProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h1 className="font-semibold text-[48px] leading-[58px] text-off-black">
        {portrait.name || "Your Portrait"}
      </h1>
      {portrait.description && (
        <p className="font-normal text-[18px] leading-[23px] tracking-[.27px] text-off-gray">{portrait.description}</p>
      )}
    </div>
  );
};

export default PortraitHeroInfo;
