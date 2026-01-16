"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import ThemedButton from "@/components/shared/ThemedButton";

type DeleteAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
};

const DeleteAccountModal = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: DeleteAccountModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone and you will lose all your data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ThemedButton
            variant="white"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </ThemedButton>
          <ThemedButton
            variant="destructive"
            onClick={onConfirm}
            loading={isLoading}
            className="w-full sm:w-auto"
          >
            Delete
          </ThemedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
