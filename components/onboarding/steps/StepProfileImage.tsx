"use client";

import ThemedButton from "@/components/shared/ThemedButton";

type StepProfileImageProps = {
  profileImage?: File;
  onChange: (file: File | undefined) => void;
  onNext: () => void;
  onSkip: () => void;
  isLoading?: boolean;
  className?: string;
};

const StepProfileImage = ({
  profileImage,
  onChange,
  onNext,
  onSkip,
  isLoading = false,
  className,
}: StepProfileImageProps) => {
  return (
    <div className={className}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-off-black">
          Upload your profile picture
        </h1>
        <p className="text-gray-6 mt-2">
          Add your profile picture to help Portrait AI and your contributors recognize your profile.
        </p>
      </div>

      <div className="mt-8">
        {/* TODO: Add PictureDropzone component */}
        <div className="border-2 border-dashed border-gray-4 rounded-lg p-12 text-center">
          <p className="text-gray-6">Picture Dropzone Component - Coming Soon</p>
        </div>

        <ThemedButton
          variant="black"
          className="mt-8 w-full py-4"
          rounded="lg"
          loading={isLoading}
          onClick={onNext}
        >
          {isLoading ? "Creating Portrait..." : "Create Portrait"}
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

export default StepProfileImage;
