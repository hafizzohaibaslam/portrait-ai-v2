"use client";
import Link from "next/link";
import { useGetAllRelatedPortraits } from "@/hooks/portraits/useGetAllRelatedPortraits";
import PortraitSectionHeader from "@/components/portraits/PortraitSectionHeader";
import PortraitGrid from "@/components/portraits/PortraitGrid";
import PortraitCard from "@/components/portraits/PortraitCard";
import PortraitCardSkeleton from "@/components/portraits/PortraitCardSkeleton";
import CreatePortraitCard from "@/components/portraits/CreatePortraitCard";
import SeeAllLink from "@/components/portraits/SeeAllLink";
import { cn } from "@/lib/utils";

type PortraitsSectionProps = {
  className?: string;
};

const PortraitsSection = ({ className }: PortraitsSectionProps) => {
  const { data: portraits, isLoading } = useGetAllRelatedPortraits();

  return (
    <section className={cn("", className)}>
      <PortraitSectionHeader title="Portraits" />
      <PortraitGrid className="mt-6">
        <CreatePortraitCard />
        {isLoading ? (
          <>
            <PortraitCardSkeleton />
            <PortraitCardSkeleton />
            <PortraitCardSkeleton />
          </>
        ) : // : error ? (
        //   <div className="col-span-full text-center text-red-500 py-8">
        //     Failed to load portraits. Please try again.
        //   </div>
        // )
        portraits && portraits.length > 0 ? (
          portraits.map((portrait) => (
            <Link
              key={portrait.portrait_id}
              href={`/dashboard/portraits/${portrait.portrait_id}`}
            >
              <PortraitCard portrait={portrait} />
            </Link>
          ))
        ) : null}
      </PortraitGrid>
      {portraits && portraits.length > 0 && (
        <SeeAllLink href="/dashboard/portraits" className="mt-4" />
      )}
    </section>
  );
};

export default PortraitsSection;
