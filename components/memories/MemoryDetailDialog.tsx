"use client";
import Image from "next/image";
import {
  AudioWaveform,
  FileText,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Memory } from "@/types/memory-types";
import { getMemoryType, hasVisualContent, capitalize } from "@/utils/memory-utils";
import MemoryActionButtons from "./MemoryActionButtons";
import MemoryDialogHeader from "./MemoryDialogHeader";
import RelatedMemories from "./RelatedMemories";
import MemoryPrivacyDialog from "./MemoryPrivacyDialog";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";

type MemoryDetailDialogProps = {
  open: boolean;
  onOpenChange: (memory: Memory | null) => void;
  memory: Memory | null;
  relatedMemories?: Memory[];
};

const MemoryDetailDialog = ({
  open,
  onOpenChange,
  memory,
  relatedMemories = [],
}: MemoryDetailDialogProps) => {  
  if (!memory) return null;
  const type = getMemoryType(memory.media_url);
  const hasVisual = hasVisualContent(memory);
  const badgeLabel = capitalize(type);

  const icon =
    type === "audio" ? (
      <AudioWaveform />
    ) : type === "image" ? (
      <ImageIcon />
    ) : type === "video" ? (
      <Video />
    ) : (
      <FileText />
    );

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Download memory:", memory.memory_id);
  };

  const filteredRelatedMemories = relatedMemories.filter(
    (m) => m.memory_id !== memory.memory_id
  );

  return (
    <>
      <Dialog open={open} onOpenChange={(open: boolean) => onOpenChange(open ? memory : null)}>
        <DialogContent
          className="w-full sm:max-w-[95%] max-h-[95vh] overflow-y-auto p-0 pb-10"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Memory Details</DialogTitle>
          <DialogDescription
            className="sr-only">
            Memory Details
          </DialogDescription>
          <MemoryDialogHeader onClose={() => onOpenChange(null)} />

          {/* Content */}
          <div className="flex-1">
            <div className="w-full max-w-[800px] mx-auto px-6">
              {/* Privacy and Actions */}
              <div className="flex items-center justify-between">
                <MemoryPrivacyDialog memory={memory} />
                <MemoryActionButtons
                  onDownload={handleDownload}
                  memory={memory}
                />
              </div>

              {/* Title and Description */}
              <div className="space-y-1 mb-5">
                <p className="font-normal text-base leading-relaxed text-off-black">
                  {memory.title}
                </p>
                {memory.description && (
                  <p className="font-normal text-base leading-relaxed text-off-black">
                    {memory.description}
                  </p>
                )}
              </div>

              {/* Media Content */}
              <div className="mt-3">
                <div
                  className={cn(
                    "relative aspect-video h-[356px] w-full rounded-xl overflow-hidden mb-6",
                    hasVisual ? "bg-gray-100" : "bg-accent-purple-001"
                  )}
                >
                  {hasVisual && type === "video" ? (
                    <>
                      <video
                        src={memory.media_url!}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls={false}
                        autoPlay={false}
                        muted={false}
                        loop={false}
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                          <div className="w-0 h-0 border-l-12 border-l-gray-800 border-y-8 border-y-transparent ml-1"></div>
                        </div>
                      </div>
                    </>
                  ) : hasVisual && memory.media_url ? (
                    <Image
                      src={memory.media_url}
                      alt={memory.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="mb-4 stroke-dominant-purple-main [&>svg]:w-20 [&>svg]:h-20">
                        {icon}
                      </div>
                      <div className="text-dominant-purple-main font-medium text-xl px-4 text-center line-clamp-1">
                        {memory.title}
                      </div>
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute top-4 left-4 bg-purple-100 text-purple-700 text-xs px-3 py-1.5 rounded-full">
                    {badgeLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Memories Section */}
            {filteredRelatedMemories.length > 0 && (
              <div className="w-full max-w-[90%] mx-auto mt-12">
                <RelatedMemories
                  memories={filteredRelatedMemories}
                  onMemoryClick={(memory: Memory) => onOpenChange(memory)}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>


    </>
  );
};

export default MemoryDetailDialog;
