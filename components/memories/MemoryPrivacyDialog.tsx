"use client";
import { Globe, Lock, Users, X, Check } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Memory } from "@/types/memory-types";
import Image from "next/image";

type PrivacyOption = "public" | "private" | "selected-people";

type MemoryPrivacyDialogProps = {
  memory: Memory;
};

const MemoryPrivacyDialog = ({
  memory,
}: MemoryPrivacyDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPrivacy, setSelectedPrivacy] =
    useState<PrivacyOption>("public");

  const handleSave = () => {
    // TODO: API call to update memory privacy
    console.log("Saving privacy settings:", {
      memoryId: memory.memory_id,
      privacy: selectedPrivacy,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Privacy Settings</DialogTitle>
      <DialogDescription className="sr-only">
        Control who can view this memory
      </DialogDescription>
      <DialogTrigger asChild>
        <button
                  className="px-3 py-2 flex gap-2 items-center bg-accent-purple-001 border border-dominant-purple-main rounded-lg cursor-pointer hover:bg-accent-purple-001/80 transition-colors"
                >
                  <Image src="/icons/globe.png" alt="Public" width={16} height={16} />
                  <span className="text-xs font-medium text-dominant-purple-main">
                    Public
                  </span>
                </button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-[600px] h-auto max-h-[90vh] md:max-h-[92vh] border-none block p-0 overflow-y-auto"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="py-6 px-8 flex items-center justify-between gap-2 border-b border-accent-purple-001">
          <div className="space-y-1">
            <h2 className="font-medium text-xl leading-[30px] text-[#1F1F1F]">
              Privacy Settings
            </h2>
            <p className="font-normal text-sm leading-[21px] text-[#6B6B6B]">
              Control who can view this memory
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-purple-001/80 transition-colors"
          >
            <X className="w-5 h-5 text-dominant-purple-main" />
          </button>
        </div>

        {/* Privacy Options */}
        <div className="px-8 py-6 space-y-3">
          <div className="space-y-3">
            {/* Public Option */}
            <button
              onClick={() => setSelectedPrivacy("public")}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left cursor-pointer flex items-center justify-between gap-4 ${
                selectedPrivacy === "public"
                  ? "border-dominant-purple-main bg-[#EFE1EF4D]"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedPrivacy === "public"
                      ? "bg-dominant-purple-main"
                      : "bg-accent-purple-001"
                  }`}
                >
                  <Globe
                    className={`w-5 h-5 ${
                      selectedPrivacy === "public" ? "text-white" : "text-gray-500"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-base leading-6 text-off-black">
                    Public
                  </div>
                  <div className="font-normal text-sm leading-[21px] text-[#6B6B6B]">
                    Anyone with access to this portrait can view
                  </div>
                </div>
              </div>
              {selectedPrivacy === "public" && (
                <Check className="w-5 h-5 text-dominant-purple-main" />
              )}
            </button>

            {/* Private Option */}
            <button
              onClick={() => setSelectedPrivacy("private")}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left cursor-pointer flex items-center justify-between gap-4 ${
                selectedPrivacy === "private"
                  ? "border-dominant-purple-main bg-[#EFE1EF4D]"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedPrivacy === "private"
                      ? "bg-dominant-purple-main"
                      : "bg-accent-purple-001"
                  }`}
                >
                  <Lock
                    className={`w-5 h-5 ${
                      selectedPrivacy === "private" ? "text-white" : "text-gray-500"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-base leading-6 text-off-black">
                    Private
                  </div>
                  <div className="font-normal text-sm leading-[21px] text-[#6B6B6B]">
                    Only you can view this memory
                  </div>
                </div>
              </div>
              {selectedPrivacy === "private" && (
                <Check className="w-5 h-5 text-dominant-purple-main" />
              )}
            </button>

            {/* Selected People Only Option */}
            <button
              onClick={() => setSelectedPrivacy("selected-people")}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left cursor-pointer flex items-center justify-between gap-4 ${
                selectedPrivacy === "selected-people"
                  ? "border-dominant-purple-main bg-[#EFE1EF4D]"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedPrivacy === "selected-people"
                      ? "bg-dominant-purple-main"
                      : "bg-accent-purple-001"
                  }`}
                >
                  <Users
                    className={`w-5 h-5 ${
                      selectedPrivacy === "selected-people"
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-base leading-6 text-off-black">
                    Selected People Only
                  </div>
                  <div className="font-normal text-sm leading-[21px] text-[#6B6B6B]">
                    Only the selected people can view this memory
                  </div>
                </div>
              </div>
              {selectedPrivacy === "selected-people" && (
                <Check className="w-5 h-5 text-dominant-purple-main" />
              )}
            </button>
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
            onClick={handleSave}
            className="px-5 py-3 bg-dominant-purple-main text-white rounded-full hover:bg-dominant-purple-main/80 transition-colors text-sm font-normal cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemoryPrivacyDialog;
