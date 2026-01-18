"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppBrand from "@/components/shared/AppBrand";
import { cn } from "@/lib/utils";
import LandingMobileMenu from "@/components/landing-page/LandingMobileMenu";

type LandingHeaderProps = {
  className?: string;
};

const navLinks = [
  { label: "Overview", href: "/" },
  { label: "Contact Us", href: "/contact-us" },
];

const socialLinks = [
  { name: "Instagram", href: "#", icon: "/images/icon-instagram.png" },
  { name: "TikTok", href: "#", icon: "/images/icon-tiktok.png" },
  { name: "X", href: "#", icon: "/images/icon-x.png" },
];

const LandingHeader = ({ className }: LandingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "px-[22px] py-6",
        "flex items-center justify-between gap-2 border-b border-gray-1 lg:border-none",
        className
      )}
    >
      {/* Logo */}
      <AppBrand />

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:items-center lg:gap-6">
        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-normal text-[16px] leading-[20px] tracking-[3%] hover:underline text-off-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
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
        <button className="get-started-button">
          <Link href="/auth/sign-up">Get Started</Link>
        </button>
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
