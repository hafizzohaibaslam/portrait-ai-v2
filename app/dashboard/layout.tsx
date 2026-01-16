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
    <div ref={ref} className={"h-screen overflow-y-auto"}>
      <DashboardHeader />
      <div className="px-4 md:px-10 lg:px-30">
        <DashboardSecondaryNav className="my-6 md:my-10" />
        <div className="pb-8 lg:pb-24">{children}</div>
      </div>
      <GeniePopupTrigger
        containerRef={ref as React.RefObject<HTMLDivElement>}
      />
    </div>
  );
};

export default DashboardLayout;
