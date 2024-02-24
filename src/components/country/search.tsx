"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

import { FRAMER_FADE_IN_OUT } from "@/lib/constants";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CountrySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleSearch(query: string) {
    const params = new URLSearchParams(window.location.search);

    if (query) params.set("q", query);
    else {
      params.delete("q");
      if (searchInputRef.current) searchInputRef.current.value = "";
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex w-full items-center">
      <Input
        className="px-10"
        placeholder="Search for a country"
        defaultValue={searchParams.get("q") || undefined}
        ref={searchInputRef}
        onChange={(e) => handleSearch(e.target.value)}
        autoFocus
      />
      <div className="center pointer-events-none absolute -top-0.5 bottom-0 left-3 flex">
        <SearchIcon className="text-zinc-500" size={18} />
      </div>
      <AnimatePresence>
        {searchParams.get("q") && (
          <motion.div {...FRAMER_FADE_IN_OUT}>
            <Button
              className="center absolute bottom-0 right-[5px] top-1/2 flex h-8 w-8 -translate-y-1/2 rounded-sm text-zinc-400 hover:text-zinc-200 hover:bg-transparent"
              variant="ghost"
              size="icon"
              onClick={() => {
                handleSearch("");
                searchInputRef.current?.focus();
              }}
            >
              <XIcon size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
