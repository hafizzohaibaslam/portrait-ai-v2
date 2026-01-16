"use client";
import FormPassword from "@/components/shared/FormPassword";
import ThemedButton from "@/components/shared/ThemedButton";
import type { SettingsFormData } from "@/types/settings";

type PasswordSectionProps = {
  isChangingPassword: boolean;
  formData: SettingsFormData;
  onFormChange: (field: keyof SettingsFormData, value: string) => void;
  onChangePassword: () => void;
  onCancelChangePassword: () => void;
  onUpdatePassword: () => void;
};

const PasswordSection = ({
  isChangingPassword,
  formData,
  onFormChange,
  onChangePassword,
  onCancelChangePassword,
  onUpdatePassword,
}: PasswordSectionProps) => {
  if (isChangingPassword) {
    return (
      <div className="space-y-4 max-w-2xl">
        <div>
          <FormPassword
            label="Current Password"
            placeholder="Enter current password"
            value={formData.currentPassword ?? ""}
            onChange={(val) => onFormChange("currentPassword", val)}
            variant="gray"
          />
        </div>
        <div>
          <FormPassword
            label="New Password"
            placeholder="Enter new password"
            value={formData.newPassword ?? ""}
            onChange={(val) => onFormChange("newPassword", val)}
            variant="gray"
          />
        </div>
        <div>
          <FormPassword
            label="Confirm Password"
            placeholder="Confirm new password"
            value={formData.confirmPassword ?? ""}
            onChange={(val) => onFormChange("confirmPassword", val)}
            variant="gray"
          />
        </div>
        <div className="lg:flex items-center gap-3 pt-2">
          <ThemedButton
            onClick={onUpdatePassword}
            variant="purple"
            rounded="full"
            className="px-6 py-2"
          >
            Update Password
          </ThemedButton>
          <ThemedButton
            onClick={onCancelChangePassword}
            variant="white"
            rounded="full"
            className="mt-2 lg:mt-0 px-6 py-2"
          >
            Cancel
          </ThemedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:flex items-center justify-between">
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div>••••••••••••••••</div>
      </div>
      <ThemedButton
        onClick={onChangePassword}
        variant="white"
        className="mt-2 lg:mt-0 px-3 py-2"
      >
        Change Password
      </ThemedButton>
    </div>
  );
};

export default PasswordSection;
