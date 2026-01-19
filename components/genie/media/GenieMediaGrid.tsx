"use client";

import { cn } from "@/lib/utils";
import type { GenieAttachment } from "@/types/genie";
import {
  AudioWaveform,
  FileText,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type GenieMediaGridProps = {
  attachments: GenieAttachment[];
  className?: string;
  isUser?: boolean;
};

const GenieMediaGrid = ({
  attachments,
  className,
  isUser = false,
}: GenieMediaGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageError = (index: number) => {
    setErrorImages((prev) => new Set(prev).add(index));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "audio":
        return <AudioWaveform className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (attachments.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-3 w-full max-w-md p-3 rounded-2xl border border-gray-200 bg-white",
        attachments.length === 1
          ? "grid-cols-1"
          : attachments.length === 2
          ? "grid-cols-2"
          : attachments.length === 3
          ? "grid-cols-2 md:grid-cols-3"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        isUser && "ml-auto",
        className
      )}
    >
      {attachments.map((attachment, index) => {
        // Use attachment.type instead of URL detection for accurate type
        const mediaType =
          attachment.type === "file" ? "document" : attachment.type;
        // Only show loading for images/videos, not audio or documents
        const isImage = mediaType === "image";
        const isVideo = mediaType === "video";
        const isAudio = mediaType === "audio";
        const isLoading =
          (isImage || isVideo) &&
          !loadedImages.has(index) &&
          !errorImages.has(index);
        const hasError = errorImages.has(index);

        return (
          <div
            key={`${attachment.url}-${index}`}
            className="relative group bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-200"
          >
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-gray-500">Loading...</span>
                </div>
              </div>
            )}

            {/* Image */}
            {isImage && !hasError && (
              <div className="relative w-full h-full">
                {attachment.url.startsWith("blob:") ? (
                  <Image
                    fill
                    src={attachment.url}
                    alt={attachment.name}
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <Image
                    src={attachment.url}
                    alt={attachment.name}
                    fill
                    className="object-cover"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
            )}

            {/* Video Thumbnail */}
            {isVideo && !hasError && (
              <div className="relative w-full h-full">
                {attachment.url.startsWith("blob:") ? (
                  <video
                    src={attachment.url}
                    className="w-full h-full object-cover"
                    muted
                    onLoadedData={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <video
                    src={attachment.url}
                    className="w-full h-full object-cover"
                    muted
                    onLoadedData={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <Video className="w-8 h-8 text-white" />
                </div>
              </div>
            )}

            {/* Audio Preview */}
            {isAudio && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div className="text-purple-600 mb-2">
                  {getTypeIcon(mediaType)}
                </div>
                <div className="text-xs text-gray-600 text-center line-clamp-2">
                  {attachment.name}
                </div>
              </div>
            )}

            {/* Non-visual media or error state */}
            {(!isImage && !isVideo && !isAudio) || hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div className="text-purple-600 mb-2">
                  {getTypeIcon(mediaType)}
                </div>
                <div className="text-xs text-gray-600 text-center line-clamp-2">
                  {attachment.name}
                </div>
              </div>
            ) : null}

            {/* Type Badge */}
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {getTypeLabel(mediaType)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GenieMediaGrid;
