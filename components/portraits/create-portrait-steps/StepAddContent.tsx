"use client";

import { useState } from "react";
import FormInput from "@/components/shared/FormInput";
import FormTextarea from "@/components/shared/FormTextarea";
import ThemedButton from "@/components/shared/ThemedButton";
import { useUpdateMemoryMutation } from "@/hooks/portraits/useUpdateMemoryMutation";

type StepAddContentProps = {
  memoryId: string;
  onNext: () => void;
};

const StepAddContent = ({ memoryId, onNext }: StepAddContentProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const updateMemoryMutation = useUpdateMemoryMutation();

  const isValid = title.trim().length > 0;

  const handleSubmit = async () => {
    if (!memoryId || !isValid) return;

    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
    };

    try {
      await updateMemoryMutation.mutateAsync({
        memoryId,
        payload,
      });
      onNext();
    } catch (error) {
      // Error is handled by mutation
    }
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div>
      <div className="max-w-[500px]">
        <div className="text-xl lg:text-[28px]">Add memory details</div>
        <div className="font-light text-lg mt-4">
          Personalize this memory by adding a title and description. You can
          always update these details later.
        </div>
      </div>
      <div className="mt-12">
        <div>
          <FormInput
            label="Memory Title"
            placeholder="Enter Title e.g My First Memory"
            value={title}
            onChange={setTitle}
            variant="white"
          />
          <div className="mt-8">
            <FormTextarea
              label="Description"
              placeholder="Write a description about this memory"
              value={description}
              onChange={setDescription}
              variant="white"
            />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div
            onClick={handleSkip}
            className="text-off-gray hover:underline cursor-pointer"
          >
            Do this later
          </div>
          <ThemedButton
            onClick={handleSubmit}
            variant="black"
            className="py-3 w-fit md:px-16"
            rounded="lg"
            disabled={!isValid || !memoryId}
            loading={updateMemoryMutation.isPending}
          >
            Save Memory
          </ThemedButton>
        </div>
      </div>
    </div>
  );
};

export default StepAddContent;
