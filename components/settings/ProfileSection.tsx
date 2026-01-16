"use client";
import { useRef } from "react";
import { Camera } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import FormInput from "@/components/shared/FormInput";
import ThemedButton from "@/components/shared/ThemedButton";
import type { User } from "@/types/global-types";
import type { SettingsFormData } from "@/types/settings";

type ProfileSectionProps = {
  user: User | null;
  formData: SettingsFormData;
  profileImagePreviewUrl?: string;
  profileImageInputKey?: string;
  onFormChange: (
    field: keyof SettingsFormData,
    value: string | File | undefined
  ) => void;
  onRemovePhoto: () => void;
};

const ProfileSection = ({
  user,
  formData,
  profileImagePreviewUrl,
  profileImageInputKey,
  onFormChange,
  onRemovePhoto,
}: ProfileSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        alert(
          `File size too large. Maximum size is 5MB. Selected file is ${fileSizeMB}MB`
        );
        return;
      }
      onFormChange("profile_image", file);
    }
  };

  return (
    <div className="text-sm">
      <div key={profileImageInputKey} className="flex items-center gap-6">
        <UserAvatar
          src={profileImagePreviewUrl || user?.profile_image_url}
          name={user?.name}
          size="lg"
        />
        <div className="block md:flex gap-4 items-center">
          <ThemedButton
            variant="white"
            className="px-3 py-2 flex items-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-[20px] h-[20px]" />
            <span className="pl-2">Change Photo</span>
          </ThemedButton>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <ThemedButton
            variant="white"
            className="text-red-3"
            onClick={onRemovePhoto}
          >
            Remove
          </ThemedButton>
        </div>
      </div>
      <div className="mt-8 space-y-4 max-w-2xl">
        <div>
          <FormInput
            label="Full Name"
            placeholder="Full Name"
            value={formData.name ?? user?.name ?? ""}
            onChange={(val) => onFormChange("name", val)}
            variant="gray"
          />
        </div>
        <div>
          <FormInput
            label="Email"
            placeholder="Email"
            type="email"
            value={formData.email ?? user?.email ?? ""}
            onChange={(val) => onFormChange("email", val)}
            variant="gray"
            disabled
          />
        </div>
        <div>
          <FormInput
            label="Phone Number"
            placeholder="Phone Number"
            type="tel"
            value={formData.phone_number ?? user?.phone_number ?? ""}
            onChange={(val) => onFormChange("phone_number", val)}
            variant="gray"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
