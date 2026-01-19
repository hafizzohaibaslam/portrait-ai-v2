"use client";

import {
  Upload,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Trash2,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
import type { GenieHint } from "@/types/genie";
import { GENIE_FILE_LIMITS } from "@/utils/genie/constants";
import { getMediaTypeFromFile } from "@/utils/genie/media-helpers";
import { useState, useEffect } from "react";
import Image from "next/image";

type GenieFileUploadProps = {
  hint: GenieHint | null;
  files: File[];
  onFilesSelect: (files: File[]) => void;
  onRemove: (index: number) => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isDragActive?: boolean;
  acceptedTypes?: string[];
  maxSize?: number;
  className?: string;
};

/**
 * File upload component with hint awareness
 * Shows upload UI only when hint is active
 * Supports drag & drop with side-by-side layout (responsive)
 */
const GenieFileUpload = ({
  hint,
  files,
  onFilesSelect,
  onRemove,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  isDragActive = false,
  acceptedTypes = GENIE_FILE_LIMITS.acceptedTypes,
  className,
}: GenieFileUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<Map<number, string>>(
    new Map()
  );

  // Create preview URLs for images and videos
  useEffect(() => {
    const urls = new Map<number, string>();
    files.forEach((file, index) => {
      const mediaType = getMediaTypeFromFile(file);
      if (mediaType === "image" || mediaType === "video") {
        const url = URL.createObjectURL(file);
        urls.set(index, url);
      }
    });
    setTimeout(() => {
      setPreviewUrls(urls);
    }, 0);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles);
    }
    e.target.value = "";
  };

  const getAcceptString = () => {
    if (hint && hint.field === "profile_image") {
      return "image/*";
    }
    return acceptedTypes.join(",");
  };

  const getFileIcon = (file: File) => {
    const mediaType = getMediaTypeFromFile(file);
    switch (mediaType) {
      case "image":
        return <ImageIcon className="w-8 h-8 text-dominant-purple-main" />;
      case "video":
        return <Video className="w-8 h-8 text-dominant-purple-main" />;
      case "audio":
        return <Music className="w-8 h-8 text-dominant-purple-main" />;
      default:
        return <FileText className="w-8 h-8 text-dominant-purple-main" />;
    }
  };

  const getFileTypeLabel = (file: File) => {
    const mediaType = getMediaTypeFromFile(file);
    const labels: Record<string, string> = {
      image: "Image",
      video: "Video",
      audio: "Audio",
      document: "Doc",
    };
    return labels[mediaType] || "Doc";
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  const truncateFileName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  // Don't render if no hint
  if (!hint || hint.action !== "show_upload") {
    return null;
  }

  return (
    <div
      className={cn("mb-4", className)}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={cn(
        files.length > 0 && "flex flex-col lg:flex-row gap-4 items-stretch"
      )}>
        {/* Drag & Drop Area */}
        <DashedBorderWrapper
          divProps={{
            onClick: () => {
              const input = document.createElement("input");
              input.type = "file";
              input.multiple = true;
              input.accept = getAcceptString();
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files) {
                  onFilesSelect(Array.from(target.files));
                }
              };
              input.click();
            },
            onDragEnter: onDragEnter,
            onDragLeave: onDragLeave,
            onDragOver: onDragOver,
            onDrop: onDrop,
          }}
          className={cn(
            files.length > 0 ? "lg:max-w-[250px] w-full" : "",
            "flex flex-col items-center justify-center cursor-pointer"
          )}
        >
          <input
            type="file"
            className="hidden"
            multiple
            accept={getAcceptString()}
            onChange={handleFileSelect}
          />
          <div
            className={cn(
              files.length > 0 ? "p-5" : "px-8 py-12",
              "flex flex-col gap-8 items-center justify-center text-center w-full max-w-[466px]"
            )}
          >
            <div className="flex flex-col items-center gap-8">
              <div className="bg-accent-purple-001 rounded-full p-4 w-[56px] h-[56px] flex items-center justify-center">
                <Upload className="stroke-dominant-purple-main w-[24px] h-[24px]" />
              </div>
              <h1 className="font-light text-[16px] leading-[24px] tracking-[3%] text-dominant-purple-main">
                Drag & drop or Choose a file to upload
              </h1>
            </div>
            {files.length === 0 && (
              <p className="font-normal text-[14px] leading-[24px] tracking-[3%] text-black-003">
                Supported file types: Images (e.g. PNG & JPEG), Videos (e.g MOV &
                MP4), Audio (e.g. MP3) and Documents (e.g. PDF & DOCX)
              </p>
            )}
          </div>
        </DashedBorderWrapper>

        {/* Media Grid Preview */}
        {files.length > 0 && (
          <div className="flex-1 grid gap-x-3 gap-y-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {files.map((file, index) => {
              const previewUrl = previewUrls.get(index);
              const mediaType = getMediaTypeFromFile(file);
              const isImage = mediaType === "image";
              const isVideo = mediaType === "video";

              return (
                <div
                  key={`${file.name}-${index}-${file.size}`}
                  className="relative border border-gray-4 bg-[#EFE1EF] rounded-[12px] overflow-hidden group aspect-square shadow"
                >
                  {/* File type label */}
                  <div className="absolute top-2 left-2 z-10 backdrop-blur-sm px-[6px] py-1 rounded-[12px] bg-[#0A01047A] font-normal text-[10px] leading-[100%] tracking-[-3%] text-white">
                    {getFileTypeLabel(file)}
                  </div>

                  {/* Preview content */}
                  {isImage && previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt={file.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  ) : isVideo && previewUrl ? (
                    <div className="relative w-full h-full">
                      <video
                        src={previewUrl}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-white/90 rounded-full p-3">
                          <Play className="w-6 h-6 text-dominant-purple-main fill-dominant-purple-main" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-4 bg-[#EFE1EF]">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-accent-purple-001 p-4 rounded-lg">
                          {getFileIcon(file)}
                        </div>
                        <div className="text-center w-full px-2 space-y-1">
                          <h3 className="font-normal text-[12px] leading-[100%] tracking-[3%] text-dominant-purple-main overflow-hidden text-ellipsis line-clamp-2">
                            {truncateFileName(file.name)}
                          </h3>
                          <span className="font-normal text-[10px] leading-[100%] tracking-[3%] text-dominant-purple-main">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => onRemove(index)}
                    className="absolute bottom-2 p-[10px] -translate-x-1/2 left-1/2 right-1/2 rounded-full border border-white w-fit bg-[#0A01047A] backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    type="button"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Media Button - Bottom right */}
      {files.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.multiple = true;
              input.accept = getAcceptString();
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files) {
                  onFilesSelect(Array.from(target.files));
                }
              };
              input.click();
            }}
            className="px-4 py-[13px] font-normal text-[16px] leading-[140%] text-dominant-purple-main rounded-[24px] transition-colors border border-[#EFE1EF] cursor-pointer hover:bg-dominant-purple-main hover:text-white"
          >
            Upload Media
          </button>
        </div>
      )}
    </div>
  );
};

export default GenieFileUpload;
