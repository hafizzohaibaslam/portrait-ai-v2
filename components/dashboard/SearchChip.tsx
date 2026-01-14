"use client";
import { Search } from "lucide-react";
import ResponsiveChip from "./ResponsiveChip";

type SearchChipProps = {
  onClick?: () => void;
  className?: string;
};

const SearchChip = ({ onClick, className }: SearchChipProps) => {
  return (
    <ResponsiveChip
      onClick={onClick}
      leadingNode={<Search className="w-5 h-5" />}
      text={<span className="text-off-gray">Search for anything</span>}
      textClassName="!no-underline"
      className={className}
    />
  );
};

export default SearchChip;
