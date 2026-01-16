// Genie AI Types

// API Response Structure
export type GenieHintAction = "show_upload";

export type GenieHint = {
  action: GenieHintAction;
  field?: "profile_image" | "media_file";
  label?: string;
  metadata?: Record<string, unknown>;
};

export type GenieActionType = "create_portrait" | "create_memory";

export type GenieAction = {
  action: GenieActionType;
  endpoint: string;
  method: "POST";
  content_type: "multipart/form-data";
  data: Record<string, unknown>;
  ready: boolean;
};

export type GenieApiResponse = {
  conversation_id?: string;
  message: string;
  hints?: GenieHint[];
  conversation_state?: string;
  collected_data?: {
    [key: string]: unknown;
    action?: GenieAction; // Present when ready
  };
};

// Request Types
export type GenieStartRequest = {
  message: string;
};

export type GenieContinueRequest = {
  conversation_id: string;
  message: string;
};

// Message Types (for UI)
export type GenieMessageRole = "user" | "assistant";

export type GenieAttachmentType = "image" | "video" | "audio" | "file";

export type GenieAttachment = {
  type: GenieAttachmentType;
  url: string;
  name: string;
  file?: File; // For pending uploads
};

export type GenieMessage = {
  id: string;
  role: GenieMessageRole;
  content: string;
  attachments?: GenieAttachment[];
  timestamp: number;
  isLoading?: boolean;
  error?: string;
};

// Conversation State
export type GenieConversationState = {
  conversationId: string | null;
  collectedData: Record<string, unknown>;
  activeHints: GenieHint[];
  pendingAction: GenieAction | null;
  uploadedFiles: {
    profile_image?: File;
    media_file?: File;
  };
};

// File Upload State (hint-based)
export type GenieFileUploadState = {
  files: File[];
  hintField?: "profile_image" | "media_file";
  hintLabel?: string;
  isVisible: boolean;
};
