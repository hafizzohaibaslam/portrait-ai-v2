// import { FileWithPath } from "react-dropzone";
// import { CreatePortraitBody, Portrait } from "../../utils/types/portrait";
// import { createPortraitFileUploadItemProps } from "../portrait/popup-create-manual-memory-upload";

import { RelationType } from "./global-types";
import { CreatePortraitPayloadBase, Portrait } from "./portrait-types";

/**
 * Onboarding flow steps
 */
export type OnboardStep =
  | "form"
  | "portrait_image"
  | "profile_image"
  | "memory_media"
  | "memory_content";

/**
 * Memory description input type
 */
export type MemoryDescriptionType = "note" | "recording";

/**
 * Memory form data structure
 */
export type MemoryFormData = {
  title?: string;
  description?: string;
  recording?: File;
};

/**
 * Picture dropzone change callback data
 * Used by OnboardUpdatePictureDropzone component
 */
export type PictureDropzoneChangeData = {
  form?: {
    picture?: File;
  };
};

/**
 * Voice recorder completion callback data
 * Used by VoiceRecorder component
 */
export type VoiceRecorderCompleteData = {
  blobUrl?: string;
  blob?: Blob;
  file?: File;
};

/**
 * Validation result
 */
export type ValidationResult = {
  error?: string;
};

/**
 * Relation type option for select dropdown
 */
export type RelationTypeOption = {
  value: RelationType;
  label: string;
};

/**
 * Main onboarding state
 * Contains all state needed for the onboarding flow
 */
export type OnboardState = {
  // Portrait creation form data
  create?: CreatePortraitPayloadBase;
  validated?: boolean;

  // Current step
  step?: OnboardStep;

  // Portrait data (after creation)
  portraitId?: string;
  portrait?: Portrait;

  // Image uploads
  portraitImage?: File;
  profileImage?: File;

  // Memory-related states
  memoryId?: string;
  memoryFiles?: File | null;
  memoryForm?: MemoryFormData;
  memoryDescriptionType?: MemoryDescriptionType;
  memoryValidated?: boolean;
  memoryMediaUploaded?: boolean;
  memoryContentAdded?: boolean;
};

/**
 * Component props for OnboardCreatePortraitForm
 */
export type OnboardCreatePortraitFormProps = { className?: string };

/**
 * Memory creation request body (for media upload step)
 */
export type MemoryMediaUploadBody = {
  portrait_id: string;
  title: string;
  media_file?: File;
};

/**
 * Memory update request body
 */
export type MemoryUpdateBody = {
  title?: string;
  description?: string;
};

/**
 * Memory creation request body (for content step)
 */
export type MemoryContentCreateBody = {
  portrait_id: string;
  title: string;
  description?: string;
  media_file?: File;
  media_url?: string;
  family_id?: string;
};

/**
 * Portrait creation API response data
 */
export type PortraitCreateResponse = {
  portrait?: Portrait;
  user?: unknown; // User data if profile was updated
};

/**
 * Memory creation API response data
 */
export type MemoryCreateResponse = {
  memory?: {
    memory_id?: string;
    [key: string]: unknown;
  };
};
