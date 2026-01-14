"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavChipProps = {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
};

const NavChip = ({
  href,
  active = false,
  children,
  className,
}: NavChipProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1 rounded-full transition-ease",
        active ? "bg-accent-purple-001" : "hover:bg-accent-purple-001/30",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavChip;
