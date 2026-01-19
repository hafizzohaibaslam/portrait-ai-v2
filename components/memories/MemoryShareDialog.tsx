"use client";

import { Copy, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type { Memory } from "@/types/memory-types";
import Image from "next/image";

type MemoryShareDialogProps = {
  memory: Memory;
};

const MemoryShareDialog = ({
  memory,
}: MemoryShareDialogProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate share link (in real app, this would come from API)
  const shareLink = `https://memories.app/share/mem-${memory.memory_id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleSendMemory = () => {
    // TODO: API call to send memory to selected users
    console.log("Sending memory:", {
      memoryId: memory.memory_id,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Share Memory</DialogTitle>
      <DialogDescription className="sr-only">
        Share this memory with family and friends
      </DialogDescription>
      <DialogTrigger asChild>
        <button
        className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        title="Share"
      >
        <Image src="/icons/share.png" alt="share" width={24} height={24} />
      </button>
      </DialogTrigger>
      <DialogContent
        className="w-[calc(100%-32px)] max-w-[600px] h-auto max-h-[90vh] md:max-h-[92vh] border-none block p-0 overflow-y-auto"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="py-6 px-8 flex items-center justify-between gap-2 border-b border-accent-purple-001">
          <div className="space-y-1">
            <h2 className="font-medium text-xl leading-[30px] text-off-black">
              Share Memory
            </h2>
            <p className="font-normal text-sm leading-[21px] text-[#6B6B6B]">
              Share this memory with family and friends
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-purple-001/80 transition-colors"
          >
            <X className="w-5 h-5 text-dominant-purple-main" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-3">
          {/* Share Link Section */}
          <div className="p-[17px] rounded-[14px] space-y-3 border border-accent-purple-001">
            <h3 className="font-medium text-sm leading-5 text-[#101828]">
              Share Link
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-3 py-2 bg-[#FAF6FA] border border-transparent rounded-[10px] font-normal text-sm leading-[100%] text-[#717182]"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 border-none bg-dominant-purple-main hover:bg-dominant-purple-main/80 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4 text-white" />
                <span className="font-medium text-sm leading-5 text-white">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
            <p className="font-normal text-xs leading-4 text-[#6B6B6B]">
              Anyone with this link can view this memory.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="py-[25px] px-8 flex items-center justify-end gap-3 border-t border-accent-purple-001">
          <DialogClose asChild>

          <button
            className="px-5 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm font-normal text-off-black cursor-pointer"
            >
            Cancel
          </button>
            </DialogClose>
          <button
            onClick={handleSendMemory}
            className="px-5 py-3 bg-dominant-purple-main text-white rounded-full hover:bg-dominant-purple-main/80 transition-colors text-sm font-normal cursor-pointer"
          >
            Share
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemoryShareDialog;
