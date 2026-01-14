"use client";

import { useState } from "react";
import MediaUploader from "@/components/shared/MediaUploader";
import FormInput from "@/components/shared/FormInput";
import FormTextarea from "@/components/shared/FormTextarea";
import ThemedButton from "@/components/shared/ThemedButton";
import MemoryCreationTabs from "@/components/shared/MemoryCreationTabs";
import { useCreateMemoryMutation } from "@/hooks/onboarding/useCreateMemoryMutation";
import type { Portrait } from "@/types/portrait-types";
import { useQueryClient } from "@tanstack/react-query";
import { Mic } from "lucide-react";

type StepAddMemoriesProps = {
  portrait: Portrait;
  onNext: () => void;
  onShare: () => void;
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
          onNext();
          return;
        }

        await createMemoryMutation.mutateAsync({
          portrait_id: portrait.portrait_id,
          type: "file",
          files,
        });
      } else {
        // Create content type (note)
        if (!title.trim()) {
          // Title is required for note type
          return;
        }

        await createMemoryMutation.mutateAsync({
          portrait_id: portrait.portrait_id,
          type: "note",
          title: title.trim(),
          description: description.trim() || undefined,
        });
      }

      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      queryClient.invalidateQueries({ queryKey: ["portraits", "related"] });

      // Reset form
      setFiles([]);
      setTitle("");
      setDescription("");
      onNext();
    } catch {
      // Error is handled by mutation
    }
  };

  const isValid =
    activeTab === "upload" ? files.length > 0 : title.trim().length > 0;

  const submitButtonText =
    activeTab === "upload" ? "Create Portrait" : "Upload Content";

  return (
    <div>
      <div className="max-w-[500px]">
        <div className="text-xl lg:text-[28px]">
          Add memory to &quot;{portrait.name}&quot;
        </div>
        <div className="font-light text-lg mt-4">
          Upload files or create content on portrait AI
        </div>
      </div>

      <div className="mt-8">
        <MemoryCreationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mt-8">
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
            <div className="relative">
              <FormTextarea
                label=""
                placeholder="Write anything here"
                value={description}
                onChange={setDescription}
                variant="white"
                className="min-h-[200px]"
              />
              <button
                type="button"
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-3 rounded-lg text-sm font-normal text-off-black hover:bg-gray-50 transition-colors"
              >
                <Mic className="w-4 h-4" />
                Record Audio
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onNext}
          className="text-off-gray hover:underline cursor-pointer"
        >
          Cancel
        </button>
        <ThemedButton
          onClick={handleSubmit}
          variant="black"
          className="py-3! w-fit md:px-16!"
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
