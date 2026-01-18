"use client";

import { useState } from "react";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import AppBrand from "@/components/shared/AppBrand";
import NavChip from "./NavChip";

const SearchModal = () => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      console.log(query);
    }
  };

  // TODO: Fetch recent searches and suggestions from API
  const recentSearches: string[] = [];
  const suggestions: string[] = [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="py-2 px-3 flex items-center gap-2 rounded-[24px] shadow cursor-pointer">
          <Search className="w-[14px] h-[14px] stroke-dominant-purple-main" />
          <span className="font-normal text-[14px] leading-[16px] tracking-[1.5%] text-off-gray">
            Search for anything
          </span>
        </button>
      </DialogTrigger>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <DialogDescription className="sr-only">
        Search for memories, highlights, people, and more.
      </DialogDescription>
      <DialogContent
        showCloseButton={false}
        className="max-w-3xl p-0 overflow-hidden bg-white rounded-3xl border-none shadow-none text-off-black"
      >
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <AppBrand href="/dashboard" />
            <DialogClose asChild>
              <button className="outline-none hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </DialogClose>
          </div>

          <div className="relative mb-10">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 stroke-gray-6" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Search memories, highlights, people..."
              className="w-full pl-12 pr-4 py-4 bg-gray-01 border border-gray-4 rounded-lg outline-none focus:border-dominant-purple-main"
            />
          </div>

          {recentSearches.length > 0 || suggestions.length > 0 ? (
            <div className="space-y-8">
              {recentSearches.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 stroke-gray-6" />
                    <span className="text-gray-6">Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <NavChip
                        key={i}
                        href={`/dashboard/search?q=${encodeURIComponent(term)}`}
                        active={false}
                        className="bg-gray-04 hover:bg-gray-04 text-black-004"
                      >
                        {term}
                      </NavChip>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 stroke-gray-6" />
                    <span className="text-gray-6">Suggested</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((term, i) => (
                      <NavChip
                        key={i}
                        href={`/dashboard/search?q=${encodeURIComponent(term)}`}
                        active={false}
                      >
                        {term}
                      </NavChip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-6 flex-1 flex flex-col items-center justify-center text-center py-12">
              <Search className="w-12 h-12 stroke-purple-001 mb-4" />
              <p className="text-lg">Start typing to search</p>
              <p className="text-sm mt-2">
                Search for memories, highlights, and people
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
