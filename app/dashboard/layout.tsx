"use client";
import { useRef } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSecondaryNav from "@/components/dashboard/DashboardSecondaryNav";
import AiPopupTrigger from "@/components/dashboard/AiPopupTrigger";

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
      <AiPopupTrigger />
    </div>
  );
};

export default DashboardLayout;
