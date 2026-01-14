"use client";

import ThemedButton from "@/components/shared/ThemedButton";

type StepPortraitImageProps = {
  portraitImage?: File;
  onChange: (file: File | undefined) => void;
  onNext: () => void;
  onSkip: () => void;
  className?: string;
};

const StepPortraitImage = ({
  portraitImage,
  onChange,
  onNext,
  onSkip,
  className,
}: StepPortraitImageProps) => {
  return (
    <div className={className}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-off-black">
          Upload portrait owner photo
        </h1>
        <p className="text-gray-6 mt-2">
          Add portrait owner photo to personalize this portrait.
        </p>
      </div>

      <div className="mt-8">
        {/* TODO: Add PictureDropzone component */}
        <div className="border-2 border-dashed border-gray-4 rounded-lg p-12 text-center">
          <p className="text-gray-6">
            Picture Dropzone Component - Coming Soon
          </p>
        </div>

        <ThemedButton
          variant="black"
          className="mt-8 w-full py-4"
          rounded="lg"
          onClick={onNext}
        >
          Continue
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

export default StepPortraitImage;
