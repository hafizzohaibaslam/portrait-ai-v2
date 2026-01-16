// Genie AI API Helper Functions

import type { GenieAction } from "@/types/genie";

/**
 * Create FormData from action data and uploaded files
 * @param action - The action object from API response
 * @param uploadedFiles - Files to include in FormData
 * @returns FormData object ready for multipart/form-data request
 */
export const createFormDataFromAction = (
  action: GenieAction,
  uploadedFiles: Record<string, File>
): FormData => {
  const formData = new FormData();

  // Add all data fields from action
  Object.entries(action.data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      // Handle different value types
      if (typeof value === "boolean") {
        formData.append(key, String(value));
      } else if (typeof value === "number") {
        formData.append(key, String(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  // Add uploaded files
  Object.entries(uploadedFiles).forEach(([field, file]) => {
    if (file) {
      formData.append(field, file);
    }
  });

  return formData;
};

/**
 * Validate file before upload
 * @param file - File to validate
 * @param maxSize - Maximum file size in bytes
 * @param acceptedTypes - Array of accepted MIME types
 * @returns Validation result with error message if invalid
 */
export const validateFile = (
  file: File,
  maxSize: number,
  acceptedTypes: string[]
): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${(maxSize / 1024 / 1024).toFixed(0)}MB limit`,
    };
  }

  // Check file type
  const isAccepted = acceptedTypes.some((type) => {
    if (type.endsWith("/*")) {
      // Wildcard type (e.g., "image/*")
      const baseType = type.split("/")[0];
      return file.type.startsWith(`${baseType}/`);
    }
    return file.type === type;
  });

  if (!isAccepted) {
    return {
      valid: false,
      error: `File type not supported. Accepted types: ${acceptedTypes.join(", ")}`,
    };
  }

  return { valid: true };
};

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Generate unique message ID
 * @returns Unique ID string
 */
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
