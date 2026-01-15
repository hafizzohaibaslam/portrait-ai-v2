"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PortraitMemoriesFooterProps = {
  href?: string;
  className?: string;
};

const PortraitMemoriesFooter = ({
  href = "/dashboard/memories",
  className,
}: PortraitMemoriesFooterProps) => {
  return (
    <div className={cn("flex justify-end mt-6", className)}>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-medium border rounded-full px-4 py-2 hover:bg-gray-50"
      >
        See all <ChevronRight size={16} />
      </Link>
    </div>
  );
};

export default PortraitMemoriesFooter;
