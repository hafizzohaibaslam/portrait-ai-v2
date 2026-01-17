"use client";

import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type GenieHighlightCardProps = {
  highlightId: string;
  videoUrl: string;
  title: string;
  className?: string;
};

const GenieHighlightCard = ({
  videoUrl,
  title,
  className,
}: GenieHighlightCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden bg-black aspect-video group cursor-pointer shadow-md",
        className
      )}
    >
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-70 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <div className="relative z-10">
          <h3 className="text-lg font-medium hover:underline">{title}</h3>
        </div>
      </div>

      {/* Play Icon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-fit h-fit box-content p-[6px] rounded-full border-4 border-white">
          <div className="w-fit h-fit box-content p-[12px] rounded-full bg-white flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 fill-purple-600 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenieHighlightCard;
