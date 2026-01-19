"use client";
import { Sparkles } from "lucide-react";

const PortraitTimelineBanner = () => {
  return (
    <div className="w-full bg-accent-purple-001 rounded-[16px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 p-[14px] rounded-[12px] bg-dominant-purple-main flex items-center justify-center shrink-0">
            <Sparkles className="stroke-white w-7 h-7" />
          </div>
          <div className="space-y-[6px]">
            <h1 className="font-medium text-[20px] leading-[24px] tracking-0 text-off-black">Interactive Timeline</h1>
            <p className="font-normal text-[16px] leading-[20px] tracking-0 text-black-005">
              Portrait AI helps you capture special moments at various life
              intervals.
            </p>
          </div>
        </div>
        <div className="w-fit py-[10px] px-[12px] rounded-[24px] bg-linear-to-r from-dominant-purple-main to-dominant-purple font-normal text-[14px] leading-[16px] tracking-[1.5%] text-white shrink-0">
          Coming Soon
        </div>
    </div>
  );
};

export default PortraitTimelineBanner;
