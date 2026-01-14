"use client";

import ThemedButton from "@/components/shared/ThemedButton";

type StepMemoryMediaProps = {
  memoryFiles?: File | null;
  onChange: (files: File | null) => void;
  onNext: () => void;
  onSkip: () => void;
  isLoading?: boolean;
  className?: string;
};

const StepMemoryMedia = ({
  memoryFiles,
  onChange,
  onNext,
  onSkip,
  isLoading = false,
  className,
}: StepMemoryMediaProps) => {
  return (
    <div className={className}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-off-black">
          Add memories to portrait
        </h1>
        <p className="text-gray-6 mt-2">
          Enrich this portrait with images, videos, and more. You can come back to add more later.
        </p>
      </div>

      <div className="mt-8">
        {/* TODO: Add MediaUploader component */}
        <div className="border-2 border-dashed border-gray-4 rounded-lg p-12 text-center">
          <p className="text-gray-6">Media Uploader Component - Coming Soon</p>
        </div>

        <ThemedButton
          variant="black"
          className="mt-8 w-full py-4"
          rounded="lg"
          disabled={!memoryFiles}
          loading={isLoading}
          onClick={onNext}
        >
          Upload Media
        </ThemedButton>
      </div>

      <button
        onClick={onSkip}
        className="block text-center text-gray-6 mt-6 hover:underline w-full"
        type="button"
      >
        Skip for now
      </button>
    </div>
  );
};

export default StepMemoryMedia;
