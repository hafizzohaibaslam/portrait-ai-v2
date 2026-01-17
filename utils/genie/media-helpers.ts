// Media type detection utilities for Genie AI

export type MediaType = "image" | "video" | "audio" | "document";

/**
 * Get media type from file extension
 */
export const getMediaTypeFromExtension = (extension: string): MediaType => {
  const ext = extension.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(ext)) {
    return "image";
  }
  if (["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(ext)) {
    return "video";
  }
  if (["mp3", "wav", "ogg", "m4a", "aac", "flac"].includes(ext)) {
    return "audio";
  }
  return "document";
};

/**
 * Get media type from URL
 */
export const getMediaTypeFromUrl = (
  url: string | undefined | null
): MediaType => {
  if (!url) return "document";
  const extension = url.split(".").pop()?.toLowerCase();
  if (!extension) return "document";
  return getMediaTypeFromExtension(extension);
};

/**
 * Get media type from File object
 */
export const getMediaTypeFromFile = (file: File): MediaType => {
  // First try MIME type
  if (file.type) {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
  }

  // Fallback to extension
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension) {
    return getMediaTypeFromExtension(extension);
  }

  return "document";
};
