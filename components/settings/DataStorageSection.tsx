"use client";
import { Crown, Trash2 } from "lucide-react";
import ThemedButton from "@/components/shared/ThemedButton";

type DataStorageSectionProps = {
  onDeleteAccount: () => void;
};

const DataStorageSection = ({ onDeleteAccount }: DataStorageSectionProps) => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-2">
            <h4 className="font-medium text-sm">Storage Used</h4>
            <span className="text-sm text-gray-5">3.5 GB of 10 GB</span>
          </div>
          <div className="w-full h-2 bg-gray-02/20 rounded-full overflow-hidden">
            <div className="h-full bg-off-black w-[35%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-dominant-purple-main rounded-xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center">
                <Crown size={18} />
                <span className="pl-1">Go Pro</span>
              </div>
              <span className="bg-white text-dominant-purple-main text-[10px] px-2 py-0.5 rounded-full ml-1">
                Coming soon
              </span>
            </div>
            <p className="mt-2 text-sm text-white/70 max-w-sm">
              Unlock unlimited storage and premium features. Store all your
              memories without limits.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 items-start justify-between">
          <div>
            <h4 className="font-medium text-red-1">Delete Account</h4>
            <p>Permanently delete your account</p>
          </div>
          <ThemedButton
            variant="destructive"
            onClick={onDeleteAccount}
            rounded="full"
            className="px-3 py-1 flex items-center"
          >
            <Trash2 className="w-4 h-4" />
            <span className="pl-1 text-sm">Delete</span>
          </ThemedButton>
        </div>
      </div>
    </>
  );
};

export default DataStorageSection;
