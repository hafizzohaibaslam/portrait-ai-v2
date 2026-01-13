"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

type IntroVideoButtonProps = {
  className?: string;
};

const IntroVideoButton = ({ className }: IntroVideoButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-pointer flex items-center p-2 bg-white rounded-md w-full",
            className
          )}
        >
          <video
            className="w-14 h-11 rounded-sm lg:rounded-md overflow-hidden object-cover object-top bg-gray-1"
            src="/videos/onboard-intro.webm"
            poster="/icons/onboard-intro.png"
            muted
          />
          <div className="pl-2 flex-1 flex items-center justify-between">
            <div>
              <div>Curious how it all works?</div>
              <div className="text-sm mt-[2px] text-off-gray">
                Watch this video to learn more
              </div>
            </div>
            <PlayButtonIcon />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        className="p-0! rounded-none! md:rounded-2xl! max-w-full! h-full! max-h-screen! md:max-w-[calc(100%-40px)]! md:max-h-[calc(100vh-64px)]! overflow-y-auto border-none!"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Introduction Video</DialogTitle>
        <DialogDescription className="sr-only">
          Watch this short video to learn how the platform works.
        </DialogDescription>
        <IntroVideoModal onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

// Play Button Icon Component
const PlayButtonIcon = () => {
  return (
    <div className="cursor-pointer fill-dominant-purple-main w-fit h-fit p-2 rounded-full bg-dominant-purple-main/20">
      <div className="w-fit h-fit rounded-full p-[6px] bg-brown-2">
        <svg
          className="w-[22px] h-[22px] rounded-full overflow-hidden"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
};

// Intro Video Modal Component
type IntroVideoModalProps = {
  onClose: () => void;
};

const IntroVideoModal = ({ onClose }: IntroVideoModalProps) => {
  return (
    <div>
      <header className="bg-white sticky top-0 p-5 lg:px-12 lg:py-6 flex items-center justify-center md:justify-between border-b-2 border-b-gray-1 lg:border-solid">
        <Link
          href="/"
          className="flex items-center font-semibold text-lg lg:text-2xl"
        >
          <Image
            src="/images/icon-app-icon.png"
            alt="Portrait AI"
            width={32}
            height={32}
            className="w-6 lg:w-8"
          />
          <span className="pl-1 lg:pl-2">Portrait AI</span>
        </Link>
        <button
          onClick={onClose}
          className="hidden md:block cursor-pointer bg-gray-6 rounded-full p-3"
          aria-label="Close"
        >
          <svg
            className="stroke-[1px] stroke-off-black w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>
      <div className="mt-6 md:mt-7 px-5 md:px-20 lg:px-[140px] pb-14">
        <button
          onClick={onClose}
          className="md:hidden cursor-pointer mb-3"
          aria-label="Close"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h2 className="text-3xl font-medium">Welcome to Portrait AI</h2>
        <p className="font-light text-lg mt-2">
          Watch this video to learn more
        </p>
        <video
          src="/videos/onboard-intro.webm"
          poster="/icons/onboard-intro.png"
          className="mt-8 mx-auto w-full h-[60vh] bg-off-black rounded-md md:rounded-2xl lg:rounded-3xl object-contain"
          controls
        />
      </div>
    </div>
  );
};

export default IntroVideoButton;
