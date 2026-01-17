"use client";

import {
  Upload,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
        return <ImageIcon className="w-6 h-6 text-gray-400" />;
      case "video":
        return <Video className="w-6 h-6 text-gray-400" />;
      case "audio":
        return <Music className="w-6 h-6 text-gray-400" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };

  const getFileTypeLabel = (file: File) => {
    const mediaType = getMediaTypeFromFile(file);
    return mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
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
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Drag & Drop Area */}
        <div className="flex-1">
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 md:p-12",
              "flex flex-col items-center justify-center gap-4",
              "transition-colors cursor-pointer bg-white min-h-[200px]",
              isDragActive
                ? "border-purple-600 bg-purple-50"
                : "border-purple-600 hover:border-purple-700 hover:bg-purple-50/30"
            )}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
              accept={getAcceptString()}
              onChange={handleFileSelect}
            />

            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <Upload className="w-8 h-8 text-purple-600" />
            </div>

            <div className="text-center">
              <span className="text-base text-gray-700">
                Drag & drop or{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
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
                  className="text-purple-600 hover:text-purple-700 font-medium underline"
                >
                  Choose a file
                </button>{" "}
                to upload
              </span>
            </div>
          </div>
        </div>

        {/* Media Grid Preview */}
        {files.length > 0 && (
          <div className="lg:w-80 lg:flex-1 shrink-0 flex flex-col">
            <div className="text-sm font-semibold text-gray-900 mb-3">
              Selected Media ({files.length})
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
              {files.map((file, index) => {
                const previewUrl = previewUrls.get(index);
                const mediaType = getMediaTypeFromFile(file);
                const isImage = mediaType === "image";
                const isVideo = mediaType === "video";

                return (
                  <div
                    key={`${file.name}-${index}-${file.size}`}
                    className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square border border-gray-200"
                  >
                    {/* Image Preview */}
                    {isImage && previewUrl && (
                      <>
                        {previewUrl.startsWith("blob:") ? (
                          <Image
                            fill
                            src={previewUrl}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={previewUrl}
                            alt={file.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </>
                    )}

                    {/* Video Preview */}
                    {isVideo && previewUrl && (
                      <div className="relative w-full h-full">
                        <video
                          src={previewUrl}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Icon for non-visual files */}
                    {!isImage && !isVideo && (
                      <div className="w-full h-full flex flex-col items-center justify-center p-2">
                        {getFileIcon(file)}
                        <div className="text-xs text-gray-600 mt-1 text-center line-clamp-1">
                          {file.name}
                        </div>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded backdrop-blur-sm">
                      {getFileTypeLabel(file)}
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(index);
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove file"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Upload Media Button - Bottom right */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default GenieFileUpload;
