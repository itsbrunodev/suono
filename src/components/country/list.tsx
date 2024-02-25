"use client";

import { TCountryCode, getCountryCode, getCountryData } from "countries-list";
import Fuse from "fuse.js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LOCATIONS } from "@/lib/constants";
import { getContinentName } from "@/lib/utils";

import { Button } from "../ui/button";
import { CountryFlag } from "./flag";

export function CountryList() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const locationsWithCountryData = LOCATIONS.map((location) => {
    const countryData = getCountryData(location.code as TCountryCode);

    return { ...location, nativeName: countryData.native };
  });

  function groupLocationsByContinent(
    locations: typeof locationsWithCountryData
  ) {
    const groupedByContinent: Record<
      string,
      (typeof locationsWithCountryData)[number][]
    > = {};

    locations.forEach((location) => {
      const countryCode = getCountryCode(location.name);

      if (location.name === "Global" || !countryCode) {
        if (!groupedByContinent["Other"]) {
          groupedByContinent["Other"] = [{ ...location, code: "global" }];
        }

        return;
      }

      const countryData = getCountryData(countryCode);
      const continentCode = countryData.continent;
      const continentName = getContinentName(continentCode);

      if (!groupedByContinent[continentName]) {
        groupedByContinent[continentName] = [];
      }

      groupedByContinent[continentName].push({
        ...location,
        code: countryCode,
        nativeName: countryData.native,
      });
    });

    return groupedByContinent;
  }

  const searchQuery = searchParams.get("q");

  const [searchResults, setSearchResults] = useState(locationsWithCountryData);

  function searchForCountries() {
    if (!searchQuery) {
      if (searchResults.length !== locationsWithCountryData.length)
        setSearchResults(locationsWithCountryData);

      return;
    }

    if (searchQuery.length < 2) return;

    const fuse = new Fuse<(typeof locationsWithCountryData)[number]>(
      locationsWithCountryData,
      {
        keys: ["name", "nativeName"],
        threshold: 0.2,
      }
    );

    setSearchResults(fuse.search(searchQuery).map((x) => x.item));
  }

  useEffect(() => {
    searchForCountries();
  }, [searchQuery]);

  if (searchResults.length === 0)
    return (
      <p className="text-center text-sm text-zinc-300">
        We couldn't find a country with that name. Double-check or{" "}
        <button
          className="text-white underline"
          onClick={() => router.replace(`/`)}
        >
          try searching for something else
        </button>
        .
      </p>
    );

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupLocationsByContinent(searchResults)).map(
        ([continentName, countries], continentIndex) => (
          <div className="flex flex-col gap-4" key={continentIndex}>
            <h1 className="w-full border-b border-b-zinc-800/50 pb-2 text-lg font-medium text-zinc-200 sm:text-xl">
              {continentName}
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {countries.map((country, countryIndex) => (
                <Link
                  href={`/${country.name.toLowerCase().replace(/ /g, "-")}`}
                  prefetch={false}
                  key={countryIndex}
                >
                  <Button
                    className="flex h-fit w-full items-center justify-start gap-2 p-3"
                    variant="ghost"
                    tabIndex={-1}
                  >
                    <CountryFlag
                      countryName={country.name}
                      countryCode={country.code || "global"}
                    />
                    <div className="flex flex-col text-left">
                      <span className="line-clamp-1 text-sm text-zinc-100 sm:text-base">
                        {country.name}
                      </span>
                      {country.name !== "Global" && (
                        <span className="line-clamp-1 text-xs font-light text-zinc-200 sm:text-sm">
                          {country.nativeName}
                        </span>
                      )}
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
