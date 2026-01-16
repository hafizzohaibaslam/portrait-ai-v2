"use client";

import { X, File, Image as ImageIcon, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";

type GenieAttachmentPreviewProps = {
  file: File;
  onRemove: () => void;
  className?: string;
};

/**
 * Component for previewing file attachments with thumbnails for media files
 */
const GenieAttachmentPreview = ({
  file,
  onRemove,
  className,
}: GenieAttachmentPreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");

  // Generate preview URL for images and videos
  useEffect(() => {
    if (isImage || isVideo) {
      const url = URL.createObjectURL(file);
      setTimeout(() => {
        setPreviewUrl(url);
      }, 0);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, isImage, isVideo]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = () => {
    if (isImage) return <ImageIcon className="w-5 h-5 text-gray-400" />;
    if (isVideo) return <Video className="w-5 h-5 text-gray-400" />;
    if (isAudio) return <Music className="w-5 h-5 text-gray-400" />;
    return <File className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div
      className={cn(
        "relative group bg-white border border-gray-200 rounded-lg overflow-hidden",
        "hover:border-gray-300 transition-colors",
        className
      )}
    >
      {/* Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 p-1 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove file"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* Preview Content */}
      {isImage && previewUrl && !error ? (
        <div className="relative w-full h-32 bg-gray-100">
          <Image
            fill
            src={previewUrl}
            alt={file.name}
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        </div>
      ) : isVideo && previewUrl ? (
        <div className="relative w-full h-32 bg-gray-100">
          <video
            src={previewUrl}
            className="w-full h-full object-cover"
            muted
            onError={() => setError(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <Video className="w-8 h-8 text-white" />
          </div>
        </div>
      ) : (
        <div className="w-full h-32 bg-gray-50 flex items-center justify-center">
          {getFileIcon()}
        </div>
      )}

      {/* File Info */}
      <div className="p-2">
        <div className="text-xs font-medium text-gray-900 truncate">
          {file.name}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {formatFileSize(file.size)}
        </div>
      </div>
    </div>
  );
};

export default GenieAttachmentPreview;
