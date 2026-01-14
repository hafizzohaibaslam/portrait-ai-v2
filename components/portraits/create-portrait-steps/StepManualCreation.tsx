"use client";

import { useState } from "react";
import { RelationType } from "@/types/global-types";
import FormInput from "@/components/shared/FormInput";
import FormSelect, { SelectOption } from "@/components/shared/FormSelect";
import PictureDropzone from "@/components/shared/PictureDropzone";
import ThemedButton from "@/components/shared/ThemedButton";
import { useCreatePortraitFromDashboardMutation } from "@/hooks/portraits/useCreatePortraitFromDashboardMutation";
import { MAX_FILE_SIZE } from "@/hooks/onboarding/useOnboardingFlow";
import type { Portrait } from "@/types/portrait-types";
import type { CreatePortraitAfterOnboardingPayload } from "@/types/portrait-types";

const RELATION_TYPE_OPTIONS: SelectOption[] = [
  { value: "your-own", label: "Your own" },
  { value: "mother", label: "Your Mother" },
  { value: "father", label: "Your Father" },
  { value: "grandmother", label: "Grandmother" },
  { value: "grandfather", label: "Grandfather" },
  { value: "friend", label: "Friend" },
  { value: "family_member", label: "Family member" },
];

const IS_LIVING_OPTIONS: SelectOption[] = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

type StepManualCreationProps = {
  onNext: (portrait: Portrait) => void;
};

const StepManualCreation = ({ onNext }: StepManualCreationProps) => {
  const [name, setName] = useState("");
  const [relationType, setRelationType] = useState<RelationType | "">("");
  const [isLiving, setIsLiving] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | undefined>();

  const isRelative = relationType && relationType !== "your-own";
  const isValid =
    name.trim().length > 0 &&
    !!relationType &&
    (relationType === "your-own" || isLiving !== "");

  const mutation = useCreatePortraitFromDashboardMutation();

  const handleSubmit = async () => {
    if (!isValid || !relationType) return;

    const payload: CreatePortraitAfterOnboardingPayload = {
      name: name.trim(),
      relation_type: relationType as RelationType,
      is_deceased: isRelative ? isLiving === "false" : false,
      profile_image: profileImage || null,
    };

    try {
      const response = await mutation.mutateAsync(payload);
      if (response.portrait) {
        onNext(response.portrait);
      }
    } catch (error) {
      // Error is handled by mutation
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8 md:mb-12">
        <h2 className="text-off-black text-[28px] font-normal font-primary leading-10">
          Create a new Portrait
        </h2>
        <p className="text-off-black text-base font-light font-primary leading-7 max-w-[371px]">
          Every person is unique and their story matters. Get started now by
          adding context to the Portrait.
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <FormInput
            label="Name of Portrait owner"
            placeholder="Portrait Name"
            value={name}
            onChange={setName}
            variant="white"
          />

          <FormSelect
            label="Whose Portrait are you crafting or contributing towards?"
            placeholder="Select option"
            options={RELATION_TYPE_OPTIONS}
            value={relationType}
            onChange={(value) => {
              setRelationType(value as RelationType);
              if (value === "your-own") {
                setIsLiving("");
              }
            }}
            variant="white"
          />

          {isRelative && (
            <FormSelect
              label="Is this person currently living?"
              placeholder="Select option"
              options={IS_LIVING_OPTIONS}
              value={isLiving}
              onChange={setIsLiving}
              variant="white"
            />
          )}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-4 text-off-black">
            Profile Image (Optional)
          </label>
          <PictureDropzone
            value={profileImage}
            onChange={setProfileImage}
            maxFileSize={MAX_FILE_SIZE}
          />
        </div>

        <ThemedButton
          variant="black"
          onClick={handleSubmit}
          disabled={!isValid || mutation.isPending}
          loading={mutation.isPending}
          className="mt-8 py-3! w-fit mx-auto md:px-16! block"
          rounded="lg"
        >
          <span className="lg:hidden">Continue</span>
          <span className="hidden lg:inline">Create Portrait</span>
        </ThemedButton>
      </div>
    </div>
  );
};

export default StepManualCreation;
