"use client";

import FormInput from "@/components/shared/FormInput";
import FormTextarea from "@/components/shared/FormTextarea";
import ThemedButton from "@/components/shared/ThemedButton";
import VoiceRecorder from "../../shared/VoiceRecorder";
import { MessageSquareMore, Mic } from "lucide-react";
import type { MemoryFormData, MemoryDescriptionType } from "@/types/onboarding";
import { cn } from "@/lib/utils";

type StepMemoryContentProps = {
  memoryForm?: MemoryFormData;
  descriptionType?: MemoryDescriptionType;
  onChange: (data: Partial<MemoryFormData>) => void;
  onDescriptionTypeChange: (type: MemoryDescriptionType) => void;
  onNext: () => void;
  onSkip: () => void;
  isLoading?: boolean;
  className?: string;
};

const StepMemoryContent = ({
  memoryForm,
  descriptionType = "note",
  onChange,
  onDescriptionTypeChange,
  onNext,
  onSkip,
  isLoading = false,
  className,
}: StepMemoryContentProps) => {
  const isValid =
    descriptionType === "recording"
      ? !!memoryForm?.title?.trim() && !!memoryForm?.recording
      : !!memoryForm?.title?.trim() || !!memoryForm?.description?.trim();

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-off-black">
          Create your first content
        </h1>
        <p className="font-normal text-[18px] leading-[28px] text-[#8D8D8D]">
          Personalize this portrait even more by adding notes or recordings. You
          can always do this or add many more updates later.
        </p>
      </div>

      <div className="space-y-3">
        <FormInput
          label="Content Title"
          placeholder="Enter Title e.g My life lessons"
          value={memoryForm?.title || ""}
          onChange={(value) => onChange({ title: value })}
          variant="white"
        />

        <div className="h-fit">
          {descriptionType === "recording" ? (
            <VoiceRecorder
              onRecordingComplete={(data) => {
                if (data.file) {
                  onChange({ recording: data.file });
                }
              }}
            />
          ) : (
            <FormTextarea
              placeholder="Write anything here"
              value={memoryForm?.description || ""}
              onChange={(value) => onChange({ description: value })}
              variant="white"
              className="min-h-[100px]"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onDescriptionTypeChange("note")}
            className={`${
              descriptionType === "recording" ? "" : "hidden"
            } flex items-center gap-1 px-5 py-3 bg-white rounded-full shadow-md shadow-black/8 hover:bg-gray-50 transition-colors cursor-pointer`}
          >
            <MessageSquareMore className="stroke-dominant-purple-main w-5 h-5" />
            <span className="text-dominant-purple-main text-sm font-normal leading-4 tracking-wide">
              Write note
            </span>
          </button>
          <button
            type="button"
            onClick={() => onDescriptionTypeChange("recording")}
            className={cn(
              "flex items-center gap-1 px-5 py-3 bg-white rounded-full shadow-md shadow-black/8 hover:bg-gray-50 transition-colors cursor-pointer",
              descriptionType === "note" ? "" : "hidden"
            )}
          >
            <Mic className="stroke-dominant-purple-main w-5 h-5" />
            <span className="text-dominant-purple-main text-sm font-normal leading-4 tracking-wide">
              Record Audio
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-gray-6 hover:underline cursor-pointer"
            type="button"
          >
            Do this later
          </button>
          <ThemedButton
            onClick={onNext}
            variant="black"
            className="py-3! w-fit md:px-16!"
            rounded="lg"
            disabled={!isValid}
            loading={isLoading}
          >
            Upload Content
          </ThemedButton>
        </div>
      </div>
    </div>
  );
};

export default StepMemoryContent;
