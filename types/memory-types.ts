// Memory Types

export type Memory = {
  memory_id: string;
  user_id: string;
  portrait_id: string;
  family_id: string;
  title: string;
  description: string;
  media_url: string | null;
};

// Payload for creating a memory
export type CreateMemoryPayload = {
  portrait_id: string; // Required: ID of the portrait this memory is about
  title: string; // Required: Title of the memory
  description?: string | null; // Optional: Detailed description
  family_id?: string | null; // Optional: Auto-retrieved from portrait if not provided
  media_file?: File | null; // Optional: Media file to upload (image/video)
  media_url?: string | null; // Optional: Existing media URL (if not uploading file)
};

// Response when creating a memory
export type CreateMemoryResponse = {
  message: string;
  memory: Memory;
};
