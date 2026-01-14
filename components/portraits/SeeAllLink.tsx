"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SeeAllLinkProps = {
  href: string;
  className?: string;
};

const SeeAllLink = ({ href, className }: SeeAllLinkProps) => {
  return (
    <div className={cn("flex justify-end", className)}>
      <Link
        href={href}
        className="group/SeeAllLink flex items-center gap-2 text-off-black hover:underline"
      >
        <span>See all</span>
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
};

export default SeeAllLink;
