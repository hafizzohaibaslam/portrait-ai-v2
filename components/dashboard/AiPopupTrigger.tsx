"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

type AiPopupTriggerProps = {
  className?: string;
};

const AiPopupTrigger = ({ className }: AiPopupTriggerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "w-14 h-14 rounded-full",
            "bg-dominant-purple-main text-white",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-all hover:scale-110",
            className
          )}
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
          <p className="text-gray-6">
            AI assistant functionality will be implemented here.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiPopupTrigger;
