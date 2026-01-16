export type NotificationKey = "email" | "push";
export type PrivacyKey = "highlights" | "memory";

export type SettingsFormData = {
  name?: string;
  email?: string;
  phone_number?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  notifications?: Record<NotificationKey, boolean>;
  privacy?: Record<PrivacyKey, boolean>;
  profile_image?: File;
};

export type SettingsState = {
  form: SettingsFormData;
  profileImagePreviewUrl?: string;
  profileImageInputKey?: string;
  isChangingPassword: boolean;
  showDeleteModal: boolean;
};
