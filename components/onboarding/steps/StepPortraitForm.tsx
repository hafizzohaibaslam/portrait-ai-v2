"use client";

import { useState } from "react";
import { RelationType } from "@/types/global-types";
import FormInput from "@/components/shared/FormInput";
import FormSelect, { SelectOption } from "@/components/shared/FormSelect";
import ThemedButton from "@/components/shared/ThemedButton";
import type { CreatePortraitPayloadBase } from "@/types/portrait-types";
import { cn } from "@/lib/utils";

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
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <h1 className="font-normal text-[32px] leading-[40px] tracking-[-3%] text-off-black">
          Lets start a Portrait
        </h1>
        <p className="font-light text-[18px] leading-[28px] tracking-[-3%] text-off-gray">
          Get started now by adding content to a portrait.
        </p>
      </div>

      <div className="space-y-[28px]">
        <div className="space-y-3">
          <FormInput
            label="Name of Portrait owner"
            placeholder="Portrait Name"
            value={name}
            onChange={setName}
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
          />

          {isRelative && (
            <FormSelect
              label="Is this person currently living?"
              placeholder="Select option"
              options={IS_LIVING_OPTIONS}
              value={isLiving}
              onChange={setIsLiving}
            />
          )}
        </div>
        <div className="space-y-6">
          <ThemedButton
            variant="black"
            className="black-button! rounded-[24px]! w-full!"
            rounded="lg"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Create Portrait
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

export default StepPortraitForm;
