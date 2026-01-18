"use client";
import { useRef } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSecondaryNav from "@/components/dashboard/DashboardSecondaryNav";
import GeniePopupTrigger from "@/components/genie/GeniePopupTrigger";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={"h-screen overflow-y-auto py-7 px-5 flex flex-col gap-15"}
    >
      <DashboardHeader />
      <div className="w-full max-w-[1272px] mx-auto flex flex-col gap-12">
        <DashboardSecondaryNav />
        {children}
      </div>
      <GeniePopupTrigger
        containerRef={ref as React.RefObject<HTMLDivElement>}
      />
    </div>
  );
};

export default DashboardLayout;
