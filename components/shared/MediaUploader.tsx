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
  Play,
} from "lucide-react";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
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

// File type configuration
const FILE_TYPE_CONFIG: Record<
  MediaFileType,
  { icon: typeof Music; label: string; accept: string }
> = {
  audio: {
    icon: Music,
    label: "Audio",
    accept: "audio/*",
  },
  image: {
    icon: ImageIcon,
    label: "Image",
    accept: "image/*",
  },
  video: {
    icon: Video,
    label: "Video",
    accept: "video/*",
  },
  document: {
    icon: FileText,
    label: "Doc",
    accept: "*/*",
  },
};

const FILE_TYPES: MediaFileType[] = ["image", "video", "audio", "document"];

// Sub-components
const UploadArea = ({
  hasFiles,
  dropzoneProps,
  inputProps,
  dropzoneClassName,
}: {
  hasFiles: boolean;
  dropzoneProps: React.HTMLAttributes<HTMLDivElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  dropzoneClassName: string;
}) => {
  return (
    <DashedBorderWrapper divProps={dropzoneProps} className={dropzoneClassName}>
      <input {...inputProps} />
      <div
        className={cn(
          hasFiles ? "p-5" : "px-8 py-12",
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
        {!hasFiles && (
          <p className="font-normal text-[14px] leading-[24px] tracking-[3%] text-black-003">
            Supported file types: Images (e.g. PNG & JPEG), Videos (e.g MOV &
            MP4), Audio (e.g. MP3) and Documents (e.g. PDF & DOCX)
          </p>
        )}
      </div>
    </DashedBorderWrapper>
  );
};

const FilePreview = ({
  file,
  previewUrl,
  onRemove,
}: {
  file: File;
  previewUrl: string | null;
  onRemove: () => void;
}) => {
  // Determine file type
  const getFileType = (): MediaFileType => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "document";
  };

  const fileType = getFileType();
  const config = FILE_TYPE_CONFIG[fileType];
  const Icon = config.icon;

  // Truncate file name if too long
  const truncateFileName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="relative border border-gray-4 bg-[#EFE1EF] rounded-[12px] overflow-hidden group aspect-square shadow">
      {/* File type label */}
      <div className="absolute top-2 left-2 z-10 backdrop-blur-sm px-[6px] py-1 rounded-[12px] bg-[#0A01047A] font-normal text-[10px] leading-[100%] tracking-[-3%] text-white">
        {config.label}
      </div>

      {/* Preview content */}
      {fileType === "image" && previewUrl ? (
        <Image
          src={previewUrl}
          alt={file.name}
          fill
          className="w-full h-full object-cover"
        />
      ) : fileType === "video" && previewUrl ? (
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
              <Icon className="w-8 h-8 text-dominant-purple-main" />
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
        onClick={onRemove}
        className="absolute bottom-2 p-[10px] -translate-x-1/2 left-1/2 right-1/2 rounded-full border border-white w-fit bg-[#0A01047A] backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
        type="button"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
};

const FileGrid = ({
  files,
  previewUrls,
  onRemove,
}: {
  files: File[];
  previewUrls: (string | null)[];
  onRemove: (index: number) => void;
}) => {
  return (
    <div className="flex-1 grid gap-x-4 gap-y-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {files.map((file, index) => (
        <FilePreview
          key={`${file.name}-${index}`}
          file={file}
          previewUrl={previewUrls[index]}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
};

const FileTypeCard = ({
  type,
  onFileSelect,
}: {
  type: MediaFileType;
  onFileSelect: (files: File[]) => void;
}) => {
  const config = FILE_TYPE_CONFIG[type];
  const Icon = config.icon;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(Array.from(e.target.files));
    }
  };

  return (
    <label className="mx-auto h-[122px] w-[240px] rounded-[14px] cursor-pointer border border-gray-9 flex flex-col gap-[17px] items-center justify-center">
      <div className="bg-accent-purple-001 p-[10px] rounded-[10px] w-[40px] h-[40px] flex items-center justify-center text-dominant-purple-main">
        <Icon className="w-[20px] h-[20px]" />
      </div>
      <p className="font-normal text-[12px] leading-[16px] tracking-0 text-black-005">
        {config.label}
      </p>
      <input
        className="hidden"
        type="file"
        multiple
        accept={config.accept}
        onChange={handleInputChange}
      />
    </label>
  );
};

const FileTypeCards = ({
  onFileSelect,
}: {
  onFileSelect: (files: File[]) => void;
}) => {
  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
      {FILE_TYPES.map((type, index) => (
        <FileTypeCard key={index} type={type} onFileSelect={onFileSelect} />
      ))}
    </div>
  );
};

const Header = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  if (!title && !description) return null;

  return (
    <div className="lg:flex items-start justify-between">
      <div className="max-w-[500px]">
        {title && <div className="text-xl lg:text-[28px]">{title}</div>}
        {description && (
          <div className="font-light text-lg">{description}</div>
        )}
      </div>
    </div>
  );
};

const MediaUploader = ({
  files,
  onFilesChange,
  onRemove,
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

  const hasFiles = files.length > 0;
  const hasHeader = Boolean(title || description || showShareButton);

  // Handle dropzone file changes
  useEffect(() => {
    if (dropzone.acceptedFiles.length > 0) {
      onFilesChange([...files, ...dropzone.acceptedFiles]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropzone.acceptedFiles]);

  // Create preview URLs for images and videos
  const previewUrls = useMemo(() => {
    return files.map((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        return URL.createObjectURL(file);
      }
      return null;
    });
  }, [files]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const handleFileSelect = (newFiles: File[]) => {
    onFilesChange([...files, ...newFiles]);
  };

  const uploadAreaClassName = cn(
    hasFiles ? "lg:max-w-[250px] w-full" : "",
    "flex flex-col items-center justify-center cursor-pointer"
  );

  const containerClassName = cn(
    hasFiles && "flex flex-col lg:flex-row gap-4 items-stretch"
  );

  return (
    <div className={cn("", className)}>
      {hasHeader && <Header title={title} description={description} />}
      <div className={containerClassName}>
        <UploadArea
          hasFiles={hasFiles}
          dropzoneProps={dropzone.getRootProps()}
          inputProps={dropzone.getInputProps()}
          dropzoneClassName={uploadAreaClassName}
        />
        {hasFiles ? (
          <FileGrid files={files} previewUrls={previewUrls} onRemove={onRemove} />
        ) : (
          <FileTypeCards onFileSelect={handleFileSelect} />
        )}
      </div>
    </div>
  );
};

export default MediaUploader;
