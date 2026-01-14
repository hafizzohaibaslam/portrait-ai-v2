"use client";
import ThemedButton from "@/components/shared/ThemedButton";
import PictureDropzone from "../shared/PictureDropzone";
import { MAX_FILE_SIZE } from "@/hooks/onboarding/useOnboardingFlow";

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
        <p className="text-[16px] font-normal leading-5 tracking-wide text-center text-[#8D8D8D] mt-6 hover:underline w-full cursor-pointer mt-2">
          Add portrait owner photo to personalize this portrait.
        </p>
      </div>

      <div className="mt-8">
        <PictureDropzone
          value={portraitImage}
          onChange={onChange}
          maxFileSize={MAX_FILE_SIZE}
        />

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
        className="block text-[16px] font-normal leading-5 tracking-wide text-center text-[#8D8D8D] mt-6 hover:underline w-full cursor-pointer"
        type="button"
      >
        Skip for now
      </button>
    </div>
  );
};

export default StepPortraitImage;
