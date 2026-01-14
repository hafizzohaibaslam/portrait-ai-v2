"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Trash2, ImagePlus } from "lucide-react";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
import { formatFileSize } from "@/utils/file-size";
import { cn } from "@/lib/utils";

type PictureDropzoneProps = {
  value?: File;
  onChange?: (file: File | undefined) => void;
  maxFileSize?: number; // in bytes
  className?: string;
};

const PictureDropzone = ({
  value,
  onChange,
  maxFileSize,
  className,
}: PictureDropzoneProps) => {
  const [error, setError] = useState<string | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const dropzone = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    maxSize: maxFileSize,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(
            `File size too large, max size is ${
              maxFileSize ? formatFileSize(maxFileSize) : "unknown"
            }.`
          );
        } else {
          setError("Please select a valid image file");
        }
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        setError(undefined);
        onChange?.(file);
      }
    },
  });

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setTimeout(() => {
        setPreviewUrl(url);
      }, 0);
      return () => {
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 0);
      };
    } else {
      setTimeout(() => {
        setPreviewUrl(undefined);
      }, 0);
    }
  }, [value]);

  const handleRemove = () => {
    setError(undefined);
    onChange?.(undefined);
  };

  return (
    <DashedBorderWrapper
      divProps={
        !previewUrl
          ? {
              ...dropzone.getRootProps(),
            }
          : {}
      }
      backgroundImage={previewUrl ? `url(${previewUrl})` : undefined}
      className={cn(
        "h-[264px] flex flex-col items-center",
        previewUrl
          ? "justify-end bg-cover bg-top bg-no-repeat"
          : "justify-center cursor-pointer",
        className
      )}
    >
      {previewUrl ? (
        <div
          onClick={handleRemove}
          className="mb-4 w-fit h-fit rounded-full p-4 cursor-pointer bg-gray-2/48 hover:bg-gray-2 fill-white transition-ease"
        >
          <Trash2 className="w-[18px] h-[18px] text-white" />
        </div>
      ) : (
        <>
          <input {...dropzone.getInputProps()} />
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="bg-purple-9 rounded-full p-10 w-fit h-fit">
              <ImagePlus className="w-[40px] h-[40px] text-dominant-purple-main" />
            </div>
            <div className="mt-8 text-brown-8">
              <div>
                Drag & drop or{" "}
                <span className="font-medium text-dominant-purple-main">
                  choose an image
                </span>{" "}
                to upload
              </div>
              {error && (
                <div className="text-red-error my-2 px-12">{error}</div>
              )}
            </div>
          </div>
        </>
      )}
    </DashedBorderWrapper>
  );
};

export default PictureDropzone;
