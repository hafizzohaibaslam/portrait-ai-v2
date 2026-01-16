"use client";
import Switch from "@/components/ui/switch";
import type { PrivacyKey, SettingsFormData } from "@/types/settings";

type PrivacySectionProps = {
  formData: SettingsFormData;
  onToggle: (key: PrivacyKey) => void;
};

const PrivacySection = ({ formData, onToggle }: PrivacySectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start lg:items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">Highlights</h4>
          <p className="text-sm text-black-004">
            Make highlights visible to those with view access (excludes
            edit/full permission)
          </p>
        </div>
        <Switch
          checked={formData.privacy?.highlights ?? false}
          onCheckedChange={() => onToggle("highlights")}
        />
      </div>
      <div className="w-full h-px bg-gray-1"></div>
      <div className="flex items-start lg:items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">Memory</h4>
          <p className="text-sm text-black-004">
            Make notes and recordings visible to those with view access
            (excludes edit/full permission)
          </p>
        </div>
        <Switch
          checked={formData.privacy?.memory ?? false}
          onCheckedChange={() => onToggle("memory")}
        />
      </div>
    </div>
  );
};

export default PrivacySection;
