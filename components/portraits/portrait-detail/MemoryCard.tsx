"use client";

import Image from "next/image";
import { AudioWaveform, FileText, Image as ImageIcon, Video } from "lucide-react";
import type { Memory } from "@/types/memory-types";
import { cn } from "@/lib/utils";

type MemoryCardProps = {
  memory: Memory;
  onClick?: () => void;
  className?: string;
};

const getMemoryType = (mediaUrl: string | null): "image" | "video" | "audio" | "document" => {
  if (!mediaUrl) return "document";
  const extension = mediaUrl.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) return "image";
  if (["mp4", "webm", "mov"].includes(extension || "")) return "video";
  if (["mp3", "wav", "ogg"].includes(extension || "")) return "audio";
  return "document";
};

const MemoryCard = ({ memory, onClick, className }: MemoryCardProps) => {
  const type = getMemoryType(memory.media_url);
  const hasVisual = (type === "image" || type === "video") && memory.media_url;

  const icon =
    type === "audio" ? (
      <AudioWaveform />
    ) : type === "image" ? (
      <ImageIcon />
    ) : type === "video" ? (
      <Video />
    ) : (
      <FileText />
    );

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 bg-white rounded-3xl border border-gray-200 hover:border-dominant-purple-main hover:shadow-md cursor-pointer transition-all duration-200",
        className
      )}
    >
      {/* Visual Area */}
      <div
        className={cn(
          "relative w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center overflow-hidden",
          hasVisual ? "bg-gray-100" : "bg-accent-purple-001"
        )}
      >
        {/* Visual Content */}
        {hasVisual && type === "video" ? (
          <video
            src={memory.media_url!}
            className="absolute inset-0 w-full h-full object-cover"
            controls={false}
            muted
            autoPlay
            loop
          />
        ) : hasVisual && memory.media_url ? (
          <Image
            src={memory.media_url}
            alt={memory.title}
            fill
            className="object-cover"
          />
        ) : (
          <>
            {/* Central Icon */}
            <div className="mb-4 stroke-dominant-purple-main [&>svg]:w-14 [&>svg]:h-14">
              {icon}
            </div>
            {/* Title inside the colored area */}
            <div className="text-dominant-purple-main font-medium text-lg px-4 text-center line-clamp-1">
              {memory.title}
            </div>
          </>
        )}

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-off-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
