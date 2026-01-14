"use client";
import ThemedButton from "@/components/shared/ThemedButton";
import PictureDropzone from "../../shared/PictureDropzone";
import { MAX_FILE_SIZE } from "@/hooks/onboarding/useOnboardingFlow";
import { cn } from "@/lib/utils";

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
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-off-black">
          Upload portrait owner photo
        </h1>
        <p className="font-normal text-[18px] leading-[28px] text-[#8D8D8D]">
          Add portrait owner photo to personalize this portrait.
        </p>
      </div>

      <div className="space-y-3">
        <PictureDropzone
          value={portraitImage}
          onChange={onChange}
          maxFileSize={MAX_FILE_SIZE}
        />

        <ThemedButton
          variant="black"
          className="mt-8 w-full py-4 disabled:hover:bg-off-black disabled:hover:text-white"
          rounded="lg"
          onClick={onNext}
        >
          Continue
        </ThemedButton>

        <button
          onClick={onSkip}
          className="block text-[16px] font-normal leading-5 tracking-wide text-center text-[#8D8D8D] mt-6 hover:underline w-full cursor-pointer"
          type="button"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default StepPortraitImage;
