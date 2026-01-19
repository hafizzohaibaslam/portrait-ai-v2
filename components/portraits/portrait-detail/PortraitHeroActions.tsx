"use client";

import { Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type PortraitHeroActionsProps = {
  onShare: () => void;
  onPrivacySettings: () => void;
  className?: string;
};

const PortraitHeroActions = ({
  onShare,
  onPrivacySettings,
  className,
}: PortraitHeroActionsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-6", className)}>
      <button
        onClick={onShare}
        className="flex items-center gap-2 text-dominant-purple-main hover:underline font-normal text-[18px] leading-[23px] tracking-[.27px]"
      >
        <Users size={18} />
        <span>Share Portrait</span>
      </button>
      <button
        onClick={onPrivacySettings}
        className="flex items-center gap-2 text-dominant-purple-main hover:underline font-normal text-[18px] leading-[23px] tracking-[.27px]"
      >
        <Settings size={18} />
        <span>Privacy Settings</span>
      </button>
    </div>
  );
};

export default PortraitHeroActions;
