"use client";

import { useState } from "react";
import { RelationType } from "@/types/global-types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import FormInput from "@/components/shared/FormInput";
import FormSelect, { SelectOption } from "@/components/shared/FormSelect";
import FormTextarea from "@/components/shared/FormTextarea";
import PictureDropzone from "@/components/shared/PictureDropzone";
import ThemedButton from "@/components/shared/ThemedButton";
import { useCreatePortraitFromDashboardMutation } from "@/hooks/portraits/useCreatePortraitFromDashboardMutation";
import { MAX_FILE_SIZE } from "@/hooks/onboarding/useOnboardingFlow";
import type { CreatePortraitAfterOnboardingPayload } from "@/types/portrait-types";

const RELATION_TYPE_OPTIONS: SelectOption[] = [
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "grandmother", label: "Grandmother" },
  { value: "grandfather", label: "Grandfather" },
  { value: "sister", label: "Sister" },
  { value: "brother", label: "Brother" },
  { value: "aunt", label: "Aunt" },
  { value: "uncle", label: "Uncle" },
  { value: "cousin", label: "Cousin" },
  { value: "spouse", label: "Spouse" },
  { value: "child", label: "Child" },
  { value: "friend", label: "Friend" },
  { value: "family_member", label: "Family member" },
  { value: "other", label: "Other" },
];

const IS_LIVING_OPTIONS: SelectOption[] = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

type CreatePortraitDialogProps = {
  onClose?: () => void;
};

const CreatePortraitDialog = ({ onClose }: CreatePortraitDialogProps = {}) => {
  const [name, setName] = useState("");
  const [relationType, setRelationType] = useState<RelationType | "">("");
  const [isLiving, setIsLiving] = useState<string>("");
  const [description, setDescription] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [subjectEmail, setSubjectEmail] = useState("");
  const [profileImage, setProfileImage] = useState<File | undefined>();

  const isRelative = relationType && relationType !== "your-own";
  const isDeceased = isLiving === "false";

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
      is_deceased: isRelative ? isDeceased : false,
      description: description.trim() || null,
      date_of_birth: dateOfBirth || null,
      date_of_death: dateOfDeath || null,
      subject_email: subjectEmail.trim() || null,
      profile_image: profileImage || null,
    };

    try {
      await mutation.mutateAsync(payload);
      // Reset form
      setName("");
      setRelationType("");
      setIsLiving("");
      setDescription("");
      setDateOfBirth("");
      setDateOfDeath("");
      setSubjectEmail("");
      setProfileImage(undefined);
      onClose?.();
    } catch (error) {
      // Error is handled by mutation
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create a new Portrait</DialogTitle>
      </DialogHeader>

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

        {isDeceased && (
          <FormInput
            label="Date of Death"
            type="text"
            placeholder="YYYY-MM-DD"
            value={dateOfDeath}
            onChange={setDateOfDeath}
            variant="white"
          />
        )}

        <FormInput
          label="Date of Birth (Optional)"
          type="text"
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
          onChange={setDateOfBirth}
          variant="white"
        />

        <FormTextarea
          label="Description (Optional)"
          placeholder="Add a description..."
          value={description}
          onChange={setDescription}
          variant="white"
        />

        <FormInput
          label="Subject Email (Optional)"
          type="email"
          placeholder="email@example.com"
          value={subjectEmail}
          onChange={setSubjectEmail}
          variant="white"
        />

        <div>
          <div className="mb-2">Portrait Image (Optional)</div>
          <PictureDropzone
            value={profileImage}
            onChange={setProfileImage}
            maxFileSize={MAX_FILE_SIZE}
          />
        </div>
      </div>

      <DialogFooter>
        <ThemedButton
          variant="white"
          onClick={onClose}
          disabled={mutation.isPending}
        >
          Cancel
        </ThemedButton>
        <ThemedButton
          variant="black"
          onClick={handleSubmit}
          disabled={!isValid || mutation.isPending}
          loading={mutation.isPending}
        >
          Create Portrait
        </ThemedButton>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreatePortraitDialog;
