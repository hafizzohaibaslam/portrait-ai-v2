"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBrand } from "@/components/shared/AppBrand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LandingMobileMenu from "@/components/landing-page/LandingMobileMenu";

type LandingHeaderProps = {
  className?: string;
};

const LandingHeader = ({ className }: LandingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "#", icon: "/images/icon-instagram.png" },
    { name: "TikTok", href: "#", icon: "/images/icon-tiktok.png" },
    { name: "X", href: "#", icon: "/images/icon-x.png" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-yellow-4 border-b-2 border-gray-1 lg:border-none",
        "px-5 py-6 lg:px-12 lg:py-6",
        "flex items-center justify-between",
        className
      )}
    >
      {/* Logo */}
      <AppBrand />

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 ml-6">
          {socialLinks.map((social) => (
            <Link key={social.name} href={social.href} aria-label={social.name}>
              <Image
                src={social.icon}
                alt={social.name}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          asChild
          variant="outline"
          className="ml-8 border-off-black bg-yellow-4 hover:bg-off-black hover:text-white"
        >
          <Link href="/auth/sign-up">Get Started</Link>
        </Button>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <Image
          src="/images/icon-hamburger.png"
          alt="Menu"
          width={40}
          height={40}
          className="w-10"
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <LandingMobileMenu
          navLinks={navLinks}
          socialLinks={socialLinks}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default LandingHeader;
