"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type PortraitTimelineBannerProps = {
  className?: string;
};

const PortraitTimelineBanner = ({ className }: PortraitTimelineBannerProps) => {
  return (
    <>
      {/* Interactive Timeline Banner */}
      <div
        className={cn(
          "mt-8 bg-accent-purple-001 rounded-2xl p-4 lg:p-6 flex items-center justify-between border border-purple-50",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-dominant-purple-main flex items-center justify-center shrink-0">
            <Sparkles className="stroke-white w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-off-black">Interactive Timeline</div>
            <div className="text-sm text-black-004 font-light mt-1 hidden sm:block">
              Portrait AI helps you capture special moments at various life
              intervals.
            </div>
          </div>
        </div>
        <div className="px-4 py-1.5 bg-dominant-purple-main text-white text-xs font-medium rounded-full shrink-0">
          Coming Soon
        </div>
      </div>
      <div className="sm:hidden text-xs text-black-004 font-light mt-2 px-1">
        Portrait AI helps you capture special moments at various life intervals.
      </div>
    </>
  );
};

export default PortraitTimelineBanner;
