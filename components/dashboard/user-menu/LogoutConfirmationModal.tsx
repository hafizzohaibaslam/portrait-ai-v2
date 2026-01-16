"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ThemedButton from "@/components/shared/ThemedButton";

type LogoutConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
};

const LogoutConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("Logout failed:", error);
      // Error handling could show toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-2 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-error" />
            </div>
            <DialogTitle>Log Out</DialogTitle>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-5">
            Are you sure you want to log out? You&apos;ll need to sign in again
            to access your memories and profile.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <ThemedButton
            variant="white"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            rounded="lg"
          >
            Cancel
          </ThemedButton>
          <ThemedButton
            variant="destructive"
            onClick={handleConfirm}
            loading={isLoading}
            rounded="lg"
          >
            Log Out
          </ThemedButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmationModal;
