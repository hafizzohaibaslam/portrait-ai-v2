"use client";
import { Circle } from "lucide-react";
import type { Highlight } from "@/types/highlights";
import HighlightCardWrapper from "./HighlightCardWrapper";
import { formatCount } from "@/utils/format-count";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type HighlightCardProps = {
  highlight: Highlight;
  className?: string;
};

const HighlightCard = ({ highlight, className }: HighlightCardProps) => {
  const formattedDate = highlight.timestamp
    ? format(new Date(highlight.timestamp), "MMM d, yyyy")
    : undefined;

  return (
    <HighlightCardWrapper
      className={cn("relative group/HighlightCard cursor-pointer", className)}
    >
      {highlight.video && (
        <video
          className="absolute w-full h-full left-0 top-0 object-cover bg-black"
          src={highlight.video}
          autoPlay
          muted
          loop
        />
      )}
      <div className="absolute w-full h-full left-0 top-0 bg-linear-to-t from-black/80 via-transparent to-transparent transition-ease" />
      <div className="absolute w-full h-full left-0 top-0 bg-black/40 opacity-0 group-hover/HighlightCard:opacity-70 transition-ease" />
      <div className="relative z-1 p-4 w-full h-full text-white flex flex-col justify-end">
        <div>
          <div className="text-lg font-medium hover:underline">
            {highlight.title}
          </div>
          <div className="mt-2 line-clamp-1 font-light flex items-center">
            {formattedDate && <span>{formattedDate}</span>}
            {highlight.totalMemories && highlight.totalMemories > 0 && (
              <>
                {formattedDate && (
                  <Circle className="fill-white mx-1" size={4} />
                )}
                <span>
                  {`${formatCount(highlight.totalMemories)} ${
                    highlight.totalMemories > 1 ? "Memories" : "Memory"
                  }`}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </HighlightCardWrapper>
  );
};

export default HighlightCard;
