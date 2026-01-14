"use client";

import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Trash2 } from "lucide-react";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
import { cn } from "@/lib/utils";

type MediaUploaderProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onRemove: (index: number) => void;
  className?: string;
};

const MediaUploader = ({
  files,
  onFilesChange,
  onRemove,
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

  return (
    <div className={cn("", className)}>
      <div className={cn(hasFiles ? "lg:flex items-stretch" : "")}>
        <DashedBorderWrapper
          divProps={dropzone.getRootProps()}
          className={cn(
            hasFiles
              ? "lg:max-w-[220px] max-h-[360px] lg:sticky top-0"
              : "",
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
                "bg-accent-purple-001 rounded-full w-fit h-fit",
                hasFiles ? "p-3 md:p-4" : "p-3 md:p-5"
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
                Supported file types: Images (e.g. PNG & JPEG), Videos (e.g MOV
                & MP4), Audio (e.g. MP3) and Documents (e.g. PDF & DOCX)
              </div>
            )}
          </div>
        </DashedBorderWrapper>

        {hasFiles && (
          <div className="mt-8 lg:mt-0 pl-4 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => {
              const previewUrl = previewUrls[index];
              return (
                <div
                  key={`${file.name}-${index}`}
                  className="relative border border-gray-4 rounded-lg overflow-hidden group aspect-square"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="p-8 text-center text-gray-6 h-full flex items-center justify-center">
                      <div>
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-gray-6 mt-1">
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
        )}
      </div>
    </div>
  );
};

export default MediaUploader;
