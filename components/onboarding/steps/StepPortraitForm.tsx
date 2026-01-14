"use client";

import { useState } from "react";
import { RelationType } from "@/types/global-types";
import FormInput from "@/components/shared/FormInput";
import FormSelect, { SelectOption } from "@/components/shared/FormSelect";
import ThemedButton from "@/components/shared/ThemedButton";
import type { CreatePortraitPayloadBase } from "@/types/portrait-types";

type StepPortraitFormProps = {
  formData?: CreatePortraitPayloadBase;
  onNext: (data: CreatePortraitPayloadBase) => void;
  onSkip: () => void;
  className?: string;
};

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

const StepPortraitForm = ({
  formData,
  onNext,
  onSkip,
  className,
}: StepPortraitFormProps) => {
  const [name, setName] = useState(formData?.name || "");
  const [relationType, setRelationType] = useState<RelationType | "">(
    formData?.relation_type || ""
  );
  const [isLiving, setIsLiving] = useState<string>(
    formData?.is_deceased === undefined
      ? ""
      : formData.is_deceased
      ? "false"
      : "true"
  );

  const isRelative = relationType && relationType !== "your-own";
  const isDeceased = isLiving === "false";

  const isValid =
    name.trim().length > 0 &&
    !!relationType &&
    (relationType === "your-own" || isLiving !== "");

  const handleSubmit = () => {
    if (!isValid || !relationType) return;

    onNext({
      name: name.trim(),
      relation_type: relationType as RelationType,
      is_deceased: isRelative ? isDeceased : false,
    });
  };

  return (
    <div className={className}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-off-black">
          Create a new Portrait
        </h1>
        <p className="text-gray-6 mt-2">
          Get started now by adding content to a portrait.
        </p>
      </div>

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

      <ThemedButton
        variant="black"
        className="mt-8 w-full py-4 disabled:hover:bg-off-black disabled:hover:text-white"
        rounded="lg"
        disabled={!isValid}
        onClick={handleSubmit}
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
  );
};

export default StepPortraitForm;
