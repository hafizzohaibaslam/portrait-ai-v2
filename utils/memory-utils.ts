import type { Memory } from "@/types/memory-types";

export type MemoryType = "image" | "video" | "audio" | "document";

/**
 * Get memory type from media URL
 */
export const getMemoryType = (mediaUrl: string | null): MemoryType => {
  if (!mediaUrl) return "document";
  const extension = mediaUrl.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(extension || ""))
    return "image";
  if (["mp4", "webm", "ogg", "mov"].includes(extension || "")) return "video";
  if (["mp3", "wav", "ogg", "m4a", "aac"].includes(extension || "")) return "audio";
  return "document";
};

/**
 * Check if memory has visual content (image or video)
 */
export const hasVisualContent = (memory: Memory): boolean => {
  const type = getMemoryType(memory.media_url);
  return (type === "image" || type === "video") && !!memory.media_url;
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
