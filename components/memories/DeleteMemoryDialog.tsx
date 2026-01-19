"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Memory } from "@/types/memory-types";
import { useDeleteMemoryMutation } from "@/hooks/memories/useDeleteMemoryMutation";

type DeleteMemoryDialogProps = {
  memory: Memory;
  
};
const DeleteMemoryDialog = ({
  memory,
}: DeleteMemoryDialogProps) => {
const [open, setOpen] = useState(false);
const deleteMutation = useDeleteMemoryMutation();

  const handleConfirm = () => {
    deleteMutation.mutate(memory.memory_id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
           <button
        className="p-1 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        title="Delete"
      >
        <Image src="/icons/trash.png" alt="delete" width={24} height={24} />
      </button>
        </DialogTrigger>
      <DialogContent className="max-w-md p-0">
        <DialogTitle className="sr-only">Delete Memory</DialogTitle>
        <DialogDescription className="sr-only">
          Are you sure you want to delete this memory? You will not be able to
          access it anymore.
        </DialogDescription>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Memory
            </h2>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this memory? You will not be able to
            access it anymore.
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <DialogClose>

            <button
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
              Cancel
            </button>
              </DialogClose>
            <button
              onClick={handleConfirm}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {deleteMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMemoryDialog;
