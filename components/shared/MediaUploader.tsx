"use client";

import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  // Users,
} from "lucide-react";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

type MediaFileType = "image" | "video" | "audio" | "document";

type MediaUploaderProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onRemove: (index: number) => void;
  onShare?: () => void;
  title?: string;
  description?: string;
  showShareButton?: boolean;
  className?: string;
};

const MediaUploader = ({
  files,
  onFilesChange,
  onRemove,
  // onShare,
  title,
  description,
  showShareButton,
  className,
}: MediaUploaderProps) => {
  const dropzone = useDropzone({
    multiple: true,
    accept: {
      "image/*": [],
      "video/*": [],
      "audio/*": [],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  useEffect(() => {
    if (dropzone.acceptedFiles.length > 0) {
      onFilesChange([...files, ...dropzone.acceptedFiles]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropzone.acceptedFiles]);

  const hasFiles = files.length > 0;

  // Create preview URLs and cleanup on unmount
  const previewUrls = useMemo(() => {
    return files.map((file) => {
      if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file);
      }
      return null;
    });
  }, [files]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const getInputCardTypes = (): MediaFileType[] => [
    "image",
    "video",
    "audio",
    "document",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesChange([...files, ...Array.from(e.target.files)]);
    }
  };

  const getFileTypeIcon = (type: MediaFileType) => {
    switch (type) {
      case "audio":
        return <Music className="w-[20px] h-[20px]" />;
      case "image":
        return <ImageIcon className="w-[20px] h-[20px]" />;
      case "video":
        return <Video className="w-[20px] h-[20px]" />;
      case "document":
        return <FileText className="w-[20px] h-[20px]" />;
    }
  };

  const getFileTypeLabel = (type: MediaFileType) => {
    switch (type) {
      case "audio":
        return "Audio";
      case "image":
        return "Images";
      case "video":
        return "Videos";
      case "document":
        return "Documents";
    }
  };

  const getFileTypeAccept = (type: MediaFileType) => {
    switch (type) {
      case "audio":
        return "audio/*";
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "document":
        return "*/*";
    }
  };

  const hasHeader = title || description || showShareButton;

  return (
    <div className={cn("", className)}>
      {hasHeader && (
        <div className="lg:flex items-start justify-between">
          {(title || description) && (
            <div className="max-w-[500px]">
              {title && <div className="text-xl lg:text-[28px]">{title}</div>}
              {description && (
                <div className="font-light text-lg">{description}</div>
              )}
            </div>
          )}
        </div>
      )}
      <div className={cn(hasHeader && "")}>
        <div className={cn(hasFiles ? "lg:flex lg:gap-4 items-stretch" : "")}>
          <DashedBorderWrapper
            divProps={dropzone.getRootProps()}
            className={cn(
              hasFiles ? "lg:max-w-[220px] max-h-[360px] lg:sticky top-0" : "",
              "flex flex-col items-center justify-center cursor-pointer"
            )}
          >
            <input {...dropzone.getInputProps()} />
            <div
              className={cn(
                hasFiles ? "p-5" : "px-8 py-12",
                "flex flex-col items-center justify-center text-center"
              )}
            >
              <div
                className={cn(
                  "bg-accent-purple-001 rounded-full p-3 w-fit h-fit",
                  hasFiles ? "md:p-4" : "md:p-5"
                )}
              >
                <Upload
                  className={cn(
                    "stroke-dominant-purple-main",
                    hasFiles ? "w-[20px] h-[20px]" : "w-[24px] h-[24px]"
                  )}
                />
              </div>
              <div className={hasFiles ? "mt-2" : "mt-8"}>
                Drag & drop or Choose a file to upload
              </div>
              {!hasFiles && (
                <div className="mt-8 text-black-003 max-w-[500px] mx-auto">
                  Supported file types: Images (e.g. PNG & JPEG), Videos (e.g
                  MOV & MP4), Audio (e.g. MP3) and Documents (e.g. PDF & DOCX)
                </div>
              )}
            </div>
          </DashedBorderWrapper>
          <>
            {hasFiles ? (
              <div className="flex-1 grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {files.map((file, index) => {
                  const previewUrl = previewUrls[index];
                  return (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative border border-gray-4 bg-[#EFE1EF] rounded-lg overflow-hidden group aspect-square"
                    >
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt={file.name}
                          fill
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="p-8 text-center text-[#6A6A6A] h-full flex items-center justify-center">
                          <div>
                            <div className="text-sm font-medium text-[#1F1F1F]">
                              {file.name}
                            </div>
                            <div className="text-xs text-[#6A6A6A] mt-1">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {getInputCardTypes().map((cardType, i) => (
                  <label
                    key={i}
                    className="py-2 lg:p-8 cursor-pointer border border-gray-9 rounded-2xl flex flex-col items-center justify-center"
                  >
                    <div className="lg:mt-4 rounded-xl bg-accent-purple-001 p-4 w-fit h-fit box-content stroke-dominant-purple-main">
                      {getFileTypeIcon(cardType)}
                    </div>
                    <div className="lg:mt-4 text-black-005">
                      {getFileTypeLabel(cardType)}
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      multiple
                      accept={getFileTypeAccept(cardType)}
                      onChange={handleInputChange}
                    />
                  </label>
                ))}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default MediaUploader;
