"use client";
import { HelpCircle } from "lucide-react";
import ResponsiveChip from "./ResponsiveChip";

type HelpChipProps = {
  className?: string;
};

const HelpChip = ({ className }: HelpChipProps) => {
  return (
    <ResponsiveChip
      href="/dashboard/support"
      leadingNode={<HelpCircle className="w-5 h-5" />}
      text={<span>Help</span>}
      className={className}
    />
  );
};

export default HelpChip;
