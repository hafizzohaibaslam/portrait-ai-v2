"use client";
import AppBrand from "./AppBrand";

const GlobalLoader = () => {
  return (
    <div className="animate-pulse h-screen bg-white flex flex-col md:flex-row items-center justify-center text-4xl md:text-6xl xl:text-8xl font-semibold">
      <AppBrand className="w-[100px] md:w-[140px] xl:w-[180px] h-auto object-cover" />
    </div>
  );
};

export default GlobalLoader;
