"use client";

import type { Portrait } from "@/types/portrait-types";
import PortraitCardWrapper from "./PortraitCardWrapper";
import { cn } from "@/lib/utils";

type PortraitCardProps = {
  portrait: Portrait;
  coverNode?: React.ReactNode;
  className?: string;
};

const PortraitCard = ({
  portrait,
  coverNode,
  className,
}: PortraitCardProps) => {
  return (
    <PortraitCardWrapper
      className={cn("cursor-pointer group/PortraitCard", className)}
    >
      <div className="h-[180px] rounded-md overflow-hidden">
        {coverNode ?? (
          <div
            style={{
              backgroundImage: portrait.image_url
                ? `url(${portrait.image_url})`
                : undefined,
            }}
            className="bg-no-repeat bg-cover bg-top w-full h-full transition-ease group-hover/PortraitCard:scale-[1.2]"
          />
        )}
      </div>
      <div className="mt-3">
        <div className="text-lg font-medium text-off-black hover:underline">
          {portrait.name}
        </div>
      </div>
    </PortraitCardWrapper>
  );
};

export default PortraitCard;
