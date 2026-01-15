"use client";

import type { Portrait } from "@/types/portrait-types";
import { cn } from "@/lib/utils";

type PortraitHeroInfoProps = {
  portrait: Portrait;
  className?: string;
};

const PortraitHeroInfo = ({ portrait, className }: PortraitHeroInfoProps) => {
  return (
    <div className={cn("", className)}>
      <h1 className="text-4xl lg:text-5xl font-bold text-off-black mb-8">
        {portrait.name || "Your Portrait"}
      </h1>
      {portrait.description && (
        <p className="text-lg text-gray-6">{portrait.description}</p>
      )}
    </div>
  );
};

export default PortraitHeroInfo;
