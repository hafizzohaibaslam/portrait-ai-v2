// Genie AI Constants

export const GENIE_SUGGESTIONS = [
  "Help me get started with my first portrait",
  "Suggest different ways to create a rich portrait",
  "Show me an example portrait highlight",
];

export const GENIE_FILE_LIMITS = {
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  acceptedTypes: ["image/*", "video/*", "audio/*"],
};

export const GENIE_DRAG_THRESHOLD = 100; // pixels
export const GENIE_EDGE_OFFSET = 24; // pixels

export const GENIE_MODAL_SIZES = {
  default: {
    width: "calc(100% - 32px)",
    maxWidth: "950px",
    height: "90vh",
  },
  fullscreen: {
    width: "calc(100% - 32px)",
    maxWidth: "100%",
    height: "94vh",
  },
};

export const GENIE_TEXTAREA_LIMITS = {
  minHeight: 40,
  maxHeight: 200,
  maxLength: 5000,
};

export const GENIE_ANIMATION_DURATION = {
  dragSnap: 300,
  modalTransition: 200,
  typewriterDelay: 10,
};

// Storage keys
export const GENIE_STORAGE_KEYS = {
  conversationId: "genie_conversation_id",
} as const;
