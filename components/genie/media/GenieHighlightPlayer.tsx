"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type GenieHighlightPlayerProps = {
  src: string | undefined;
  poster?: string;
  className?: string;
  isUser?: boolean;
};

const GenieHighlightPlayer = ({
  src,
  poster,
  className,
  isUser = false,
}: GenieHighlightPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!src) return null;

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden group shadow-md bg-black aspect-video cursor-pointer max-w-[600px]",
        isUser && "ml-auto",
        className
      )}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onEnded={() => setIsPlaying(false)}
        onLoadedData={() => setIsLoading(false)}
        controls={isPlaying}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-white">Loading video...</span>
          </div>
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-fit h-fit box-content p-[6px] rounded-full border-4 border-white">
            <div className="w-fit h-fit box-content p-[12px] rounded-full bg-white flex items-center justify-center shadow-lg scale-100 group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-purple-600 text-purple-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenieHighlightPlayer;
