// Genie AI Types

// API Response Structure
export type GenieHintAction =
  | "show_upload"
  | "add_memory"
  | "select_memory_type"
  | "select_duration"
  | "show_portrait_card"
  | "show_highlight_card"
  | "new_description";

export type GenieHint = {
  action: GenieHintAction;
  field?: "profile_image" | "media_file";
  label?: string;
  metadata?: {
    durations?: string[];
    memory_types?: string[];
    portrait_id?: string;
    highlight_id?: string;
    image_url?: string;
    video_url?: string;
    title?: string;
    name?: string;
    [key: string]: unknown;
  };
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
  portraitCard?: {
    portrait_id: string;
    image_url: string;
    name: string;
  };
  highlightCard?: {
    highlight_id: string;
    video_url: string;
    title: string;
  };
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
