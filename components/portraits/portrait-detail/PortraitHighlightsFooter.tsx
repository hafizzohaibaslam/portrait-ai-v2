"use client";

import SeeAllLink from "@/components/portraits/SeeAllLink";
import { cn } from "@/lib/utils";

type PortraitHighlightsFooterProps = {
  href?: string;
  className?: string;
};

const PortraitHighlightsFooter = ({
  href = "/dashboard/highlights",
  className,
}: PortraitHighlightsFooterProps) => {
  return <SeeAllLink href={href} className={cn("mt-4", className)} />;
};

export default PortraitHighlightsFooter;
