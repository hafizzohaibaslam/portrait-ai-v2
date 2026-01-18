"use client";
import Image from "next/image";

const AuthVideoSidebar = () => {
  return (
    <div className="sticky top-0 hidden lg:block max-w-[500px] xl:max-w-[600px] 2xl:max-w-[800px] w-full h-full p-4">
      <div className="relative w-full h-full">
        {/* Overlay Text */}
        <div className="absolute w-full p-5 z-10">
          <div className="relative">
            <div className="absolute w-full p-4 rounded-[12px] flex gap-1 items-center justify-between bg-black-3">
              <span className="font-normal text-[20px] leading-[100%] tracking-[-3%] text-white">
                Each memory makes the portrait richer.
              </span>
              <Image
                src="/images/icon-app-icon-light.png"
                alt="Portrait AI"
                width={28}
                height={28}
                className="w-7"
              />
            </div>
          </div>
        </div>
        {/* Video */}
        <video
          className="w-full h-full rounded-[8px] lg:rounded-[12px] overflow-hidden object-cover object-top bg-gray-1"
          src="/videos/pre-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
};

export default AuthVideoSidebar;
