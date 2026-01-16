"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, Database, Globe, Shield, User } from "lucide-react";
import { useAuthContext } from "@/providers/AuthContext";
import { useUpdateUserMutation } from "@/hooks/user/useUpdateUserMutation";
import type {
  SettingsFormData,
  NotificationKey,
  PrivacyKey,
} from "@/types/settings";
import SettingsSection from "@/components/settings/SettingsSection";
import ProfileSection from "@/components/settings/ProfileSection";
import PasswordSection from "@/components/settings/PasswordSection";
import NotificationsSection from "@/components/settings/NotificationsSection";
import PrivacySection from "@/components/settings/PrivacySection";
import LanguageSection from "@/components/settings/LanguageSection";
import DataStorageSection from "@/components/settings/DataStorageSection";
import DeleteAccountModal from "@/components/settings/DeleteAccountModal";
import ThemedButton from "@/components/shared/ThemedButton";

const SettingsPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const updateUserMutation = useUpdateUserMutation();

  const [formData, setFormData] = useState<SettingsFormData>({});
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<
    string | undefined
  >();
  const [profileImageInputKey, setProfileImageInputKey] = useState<string>("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleFormChange = useCallback(
    (field: keyof SettingsFormData, value: string | File | undefined) => {
      setFormData((prev) => {
        if (field === "profile_image" && value instanceof File) {
          const url = URL.createObjectURL(value);
          setProfileImagePreviewUrl(url);
          return { ...prev, [field]: value };
        }
        return { ...prev, [field]: value };
      });
    },
    []
  );

  const handleRemovePhoto = useCallback(() => {
    setFormData((prev) => {
      const { ...rest } = prev;
      return rest;
    });
    setProfileImagePreviewUrl(undefined);
    setProfileImageInputKey(Date.now().toString());
  }, []);

  const handleToggleNotification = useCallback((key: NotificationKey) => {
    setFormData((prev) => {
      const currentEmail = prev.notifications?.email ?? false;
      const currentPush = prev.notifications?.push ?? false;
      const newNotifications: Record<NotificationKey, boolean> = {
        email: key === "email" ? !currentEmail : currentEmail,
        push: key === "push" ? !currentPush : currentPush,
      };
      return {
        ...prev,
        notifications: newNotifications,
      };
    });
  }, []);

  const handleTogglePrivacy = useCallback((key: PrivacyKey) => {
    setFormData((prev) => {
      const currentHighlights = prev.privacy?.highlights ?? false;
      const currentMemory = prev.privacy?.memory ?? false;
      const newPrivacy: Record<PrivacyKey, boolean> = {
        highlights:
          key === "highlights" ? !currentHighlights : currentHighlights,
        memory: key === "memory" ? !currentMemory : currentMemory,
      };
      return {
        ...prev,
        privacy: newPrivacy,
      };
    });
  }, []);

  const handleSave = useCallback(() => {
    updateUserMutation.mutate(formData);
  }, [formData, updateUserMutation]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const handleDeleteAccount = useCallback(async () => {
    // TODO: Implement delete account API call
    setShowDeleteModal(false);
    // await deleteAccountMutation.mutateAsync();
  }, []);

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="lg:flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-off-black">Settings</h1>
          <p className="mt-2 font-light text-off-gray">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="mt-4 lg:mt-0 md:flex items-center gap-3">
          <ThemedButton onClick={handleCancel} variant="white" rounded="full">
            Cancel
          </ThemedButton>
          <ThemedButton
            onClick={handleSave}
            disabled={updateUserMutation.isPending}
            variant="purple"
            rounded="full"
            className="mt-2 lg:mt-0 bg-dominant-purple-main text-white hover:bg-white hover:text-dominant-purple-main rounded-full px-6"
            loading={updateUserMutation.isPending}
          >
            Save Changes
          </ThemedButton>
        </div>
      </div>

      <div className="space-y-6">
        <SettingsSection
          icon={<User />}
          title="Profile"
          subtitle="Update your photo and personal details"
        >
          <ProfileSection
            user={user}
            formData={formData}
            profileImagePreviewUrl={profileImagePreviewUrl}
            profileImageInputKey={profileImageInputKey}
            onFormChange={handleFormChange}
            onRemovePhoto={handleRemovePhoto}
          />
        </SettingsSection>

        <SettingsSection
          icon={<Shield />}
          title="Password"
          subtitle="Change your password"
        >
          <PasswordSection
            isChangingPassword={isChangingPassword}
            formData={formData}
            onFormChange={handleFormChange}
            onChangePassword={() => setIsChangingPassword(true)}
            onCancelChangePassword={() => {
              setIsChangingPassword(false);
              handleFormChange("currentPassword", undefined);
              handleFormChange("newPassword", undefined);
              handleFormChange("confirmPassword", undefined);
            }}
            onUpdatePassword={() => {
              setIsChangingPassword(false);
              handleFormChange("currentPassword", undefined);
              handleFormChange("newPassword", undefined);
              handleFormChange("confirmPassword", undefined);
            }}
          />
        </SettingsSection>

        <SettingsSection
          icon={<Bell />}
          title="Notifications"
          subtitle="Manage how you receive notifications"
        >
          <NotificationsSection
            formData={formData}
            onToggle={handleToggleNotification}
          />
        </SettingsSection>

        <SettingsSection
          icon={<Shield />}
          title="Privacy & Security"
          subtitle="Control your privacy settings"
        >
          <PrivacySection formData={formData} onToggle={handleTogglePrivacy} />
        </SettingsSection>

        <SettingsSection
          icon={<Globe />}
          title="Language"
          subtitle="Choose your preferred language"
          titleRightNode={
            <div className="border border-purple-02 bg-purple-01 text-dominant-purple-main text-sm px-2 py-0.5 rounded-full">
              Coming soon
            </div>
          }
        >
          <LanguageSection />
        </SettingsSection>

        <SettingsSection
          icon={<Database />}
          title="Data & Storage"
          subtitle="Track your data and storage"
        >
          <DataStorageSection
            onDeleteAccount={() => setShowDeleteModal(true)}
          />
        </SettingsSection>
      </div>

      <DeleteAccountModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default SettingsPage;
