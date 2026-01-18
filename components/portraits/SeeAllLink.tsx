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
        className="group/SeeAllLink flex items-center gap-2 rounded-[24px] shadow border border-gray-3 hover:underline py-[10px] px-6 text-center transition-all duration-300 ease-in-out w-fit"
      >
        <span className="font-normal text-[16px] leading-[20px] tracking-[3%] text-off-black">
          See all
        </span>
        <ChevronRight className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default SeeAllLink;
