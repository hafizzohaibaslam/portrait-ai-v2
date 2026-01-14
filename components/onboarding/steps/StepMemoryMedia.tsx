"use client";

import ThemedButton from "@/components/shared/ThemedButton";
import MediaUploader from "../../shared/MediaUploader";
import { cn } from "@/lib/utils";

type StepMemoryMediaProps = {
  memoryFiles?: File[];
  onChange: (files: File[]) => void;
  onNext: () => void;
  onSkip: () => void;
  isLoading?: boolean;
  className?: string;
};

const StepMemoryMedia = ({
  memoryFiles = [],
  onChange,
  onNext,
  onSkip,
  isLoading = false,
  className,
}: StepMemoryMediaProps) => {
  const handleRemove = (index: number) => {
    const updatedFiles = memoryFiles.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-off-black">
          Add memories to portrait
        </h1>
        <p className="font-normal text-[18px] leading-[28px] text-[#8D8D8D]">
          Enrich this portrait with images, videos, and more. You can come back
          to add more later.
        </p>
      </div>

      <div className="space-y-3">
        <MediaUploader
          files={memoryFiles}
          onFilesChange={onChange}
          onRemove={handleRemove}
        />

        <ThemedButton
          variant="black"
          className="mt-8 w-full py-4 disabled:hover:bg-off-black disabled:hover:text-white"
          rounded="lg"
          disabled={memoryFiles.length === 0}
          loading={isLoading}
          onClick={onNext}
        >
          Upload Media
        </ThemedButton>
      </div>

      <button
        onClick={onSkip}
        className="block text-[16px] font-normal leading-5 tracking-wide text-center text-[#8D8D8D] mt-6 hover:underline w-full cursor-pointer"
        type="button"
      >
        Skip for now
      </button>
    </div>
  );
};

export default StepMemoryMedia;
