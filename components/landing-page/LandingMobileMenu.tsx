"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LandingMobileMenuProps = {
  navLinks: Array<{ label: string; href: string }>;
  socialLinks: Array<{ name: string; href: string; icon: string }>;
  onClose: () => void;
};

const LandingMobileMenu = ({
  navLinks,
  socialLinks,
  onClose,
}: LandingMobileMenuProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        "bg-yellow-4/90 backdrop-blur-md",
        "transition-transform duration-300",
        "flex items-center justify-center"
      )}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 p-2"
        aria-label="Close menu"
      >
        <X className="w-10 h-10 text-off-black/70" />
      </button>

      {/* Menu Content */}
      <div className="flex flex-col items-center gap-8">
        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="bg-off-black text-white hover:bg-white hover:text-off-black"
        >
          <Link href="/auth/sign-up" onClick={onClose}>
            Get Started
          </Link>
        </Button>

        {/* Nav Links */}
        <nav className="flex flex-col items-center gap-8 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="hover:underline text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-10 mt-20">
          {socialLinks.map((social) => (
            <Link key={social.name} href={social.href} aria-label={social.name}>
              <Image
                src={social.icon}
                alt={social.name}
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingMobileMenu;
