"use client";
import { useState } from "react";
import MediaUploader from "@/components/shared/MediaUploader";
import FormInput from "@/components/shared/FormInput";
import FormTextarea from "@/components/shared/FormTextarea";
import ThemedButton from "@/components/shared/ThemedButton";
import MemoryCreationTabs from "@/components/shared/MemoryCreationTabs";
import VoiceRecorder from "@/components/shared/VoiceRecorder";
import { useCreateMemoryMutation } from "@/hooks/onboarding/useCreateMemoryMutation";
import type { Portrait } from "@/types/portrait-types";
import type { MemoryDescriptionType } from "@/types/onboarding";
import { useQueryClient } from "@tanstack/react-query";
import { MessageSquareMore, Mic } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type StepAddMemoriesProps = {
  portrait: Portrait;
  onNext?: () => void;
  onShare?: () => void;
};

const StepAddMemories = ({
  portrait,
  onNext,
  onShare,
}: StepAddMemoriesProps) => {
  const [activeTab, setActiveTab] = useState<"upload" | "content">("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionType, setDescriptionType] =
    useState<MemoryDescriptionType>("note");
  const [recording, setRecording] = useState<File | null>(null);
  const createMemoryMutation = useCreateMemoryMutation();
  const queryClient = useQueryClient();

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!portrait.portrait_id) return;

    try {
      if (activeTab === "upload") {
        // Upload files type
        if (files.length === 0) {
          // No files, just close
          onNext?.();
          return;
        }

        await createMemoryMutation.mutateAsync(
          {
            portrait_id: portrait.portrait_id,
            type: "file",
            files,
          },
          {
            onSuccess: () => {
              toast.success("Memory created successfully");
            },
          }
        );
      } else {
        // Create content type
        if (descriptionType === "recording" && recording) {
          // Recorded audio - use multipart/form-data with type="content"
          await createMemoryMutation.mutateAsync({
            portrait_id: portrait.portrait_id,
            type: "content",
            files: [recording],
          });
        } else {
          // Typed text content - combine title and description into body
          const bodyContent = title.trim()
            ? `${title.trim()}${
                description.trim() ? `\n\n${description.trim()}` : ""
              }`
            : description.trim();

          if (!bodyContent) {
            // Body is required for content type when not using recording
            return;
          }

          await createMemoryMutation.mutateAsync({
            portrait_id: portrait.portrait_id,
            type: "content",
            body: bodyContent,
          });
        }
      }

      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      queryClient.invalidateQueries({ queryKey: ["portraits", "related"] });
      queryClient.invalidateQueries({ queryKey: ["portrait"] });

      // Reset form
      setFiles([]);
      setTitle("");
      setDescription("");
      setDescriptionType("note");
      setRecording(null);
      onNext?.();
    } catch {
      // Error is handled by mutation
    }
  };

  const isValid =
    activeTab === "upload"
      ? files.length > 0
      : descriptionType === "recording"
      ? title.trim().length > 0 && recording !== null
      : title.trim().length > 0 || description.trim().length > 0;
  const submitButtonText = "Create Memory";

  return (
    <div className={cn("space-y-6")}>
      <div className="space-y-1">
        <h1 className="font-normal text-[32px] leading-[40px] tracking-[-3%] text-off-black">
          Add memory to &quot;{portrait.name}&quot;
        </h1>
        <p className="font-light text-[18px] leading-[28px] tracking-[-3%] text-off-gray">
          Upload files or create content on portrait AI
        </p>
      </div>

      <MemoryCreationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="">
        {activeTab === "upload" ? (
          <MediaUploader
            files={files}
            onFilesChange={handleFilesChange}
            onRemove={handleRemove}
            onShare={onShare}
            showShareButton={!!portrait}
            title=""
            description=""
          />
        ) : (
          <div className="space-y-6">
            <FormInput
              label="Content Title"
              placeholder="Enter Title e.g. My life lessons"
              value={title}
              onChange={setTitle}
              variant="white"
            />
            <div className="h-fit">
              {descriptionType === "recording" ? (
                <VoiceRecorder
                  onRecordingComplete={(data) => {
                    if (data.file) {
                      setRecording(data.file);
                    }
                  }}
                />
              ) : (
                <FormTextarea
                  label=""
                  placeholder="Write anything here"
                  value={description}
                  onChange={setDescription}
                  variant="white"
                  className="min-h-[100px]"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDescriptionType("note")}
                className={cn(
                  "flex items-center gap-1 px-5 py-3 bg-white rounded-full shadow-md shadow-black/8 hover:bg-gray-50 transition-colors cursor-pointer",
                  descriptionType === "recording" ? "" : "hidden"
                )}
              >
                <MessageSquareMore className="stroke-dominant-purple-main w-5 h-5" />
                <span className="text-dominant-purple-main text-sm font-normal leading-4 tracking-wide">
                  Write note
                </span>
              </button>
              <button
                type="button"
                onClick={() => setDescriptionType("recording")}
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
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onNext}
          className="text-off-gray hover:underline cursor-pointer"
        >
          Cancel
        </button>
        <ThemedButton
          onClick={handleSubmit}
          variant="black"
          className="black-button! rounded-[24px]!"
          rounded="lg"
          loading={createMemoryMutation.isPending}
          disabled={!isValid || !portrait.portrait_id}
        >
          {submitButtonText}
        </ThemedButton>
      </div>
    </div>
  );
};

export default StepAddMemories;
