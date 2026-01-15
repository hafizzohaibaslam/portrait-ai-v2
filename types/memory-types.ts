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

// Payload for creating a memory (new API)
export type CreateMemoryPayload =
  | {
      portrait_id: string;
      type: "content";
      body: string; // Text content for typed text
      files?: never; // Ensure files is not present
    }
  | {
      portrait_id: string;
      type: "file";
      files: File[]; // Required if type=file, one or more files
      body?: never; // Ensure body is not present
    }
  | {
      portrait_id: string;
      type: "content";
      files: File[]; // Single audio file for recorded audio (type="content" with file)
      body?: never; // Ensure body is not present
    };

// File information in memory response
export type MemoryFile = {
  id: string;
  name: string;
  mime_type: string;
  size_bytes: number;
  url: string;
};

// Single memory response
export type MemoryResponse = {
  id: string;
  portrait_id: string;
  type: "note" | "file";
  title?: string;
  description?: string;
  file?: MemoryFile;
  created_at: string;
};

// Response when creating a memory (new API)
export type CreateMemoryResponse =
  | MemoryResponse // For type=note
  | {
      portrait_id: string;
      type: "file";
      memories: MemoryResponse[];
    }; // For type=file (bulk)
