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
        <h1 className="font-normal text-[32px] leading-[40px] tracking-[-3%] text-off-black">
          Upload portrait owner photo
        </h1>
        <p className="font-light text-[18px] leading-[28px] tracking-[-3%] text-off-gray">
          Add portrait owner photo to personalize this portrait.
        </p>
      </div>

      <div className="space-y-[28px]">
        <div className="space-y-3">
          <PictureDropzone
            value={portraitImage}
            onChange={onChange}
            maxFileSize={MAX_FILE_SIZE}
          />
        </div>
        <div className="space-y-6">
          <ThemedButton
            variant="black"
            className="black-button! rounded-[24px]! w-full!"
            rounded="lg"
            onClick={onNext}
          >
            Continue
          </ThemedButton>

          <button
            onClick={onSkip}
            className="block text-[16px] font-normal leading-5 tracking-wide text-center text-[#8D8D8D] hover:underline w-full cursor-pointer"
            type="button"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepPortraitImage;
