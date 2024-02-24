import { TCountryCode, getCountryData } from "countries-list";
import Link from "next/link";

import { cn, toKebabCase } from "@/lib/utils";

import { Button } from "../ui/button";
import { CountryFlag } from "./flag";

export function CountryCard({
  className,
  name,
  capital,
  continent,
  code,
  bordering,
  playlistId,
}: {
  className?: string;
  name: string;
  capital: string;
  continent: string;
  code?: string | null;
  bordering: string[] | never[];
  playlistId: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full md:w-[420px] flex-col rounded-lg border border-zinc-800 bg-zinc-900/60",
        className
      )}
    >
      <div className="flex flex-col gap-4 p-4">
        <CountryFlag
          className="w-full sm:w-full"
          countryName={name}
          countryCode={code || ""}
        />
        <div className="flex flex-col py-2 text-sm">
          <div className="flex w-full items-center justify-between border-b border-b-zinc-700 pb-2">
            <p className="font-medium text-white">Name</p>
            <span className="text-zinc-300">{name}</span>
          </div>
          <div className="flex w-full items-center justify-between border-b border-b-zinc-700 py-2">
            <p className="font-medium text-white">Capital</p>
            <span className="text-zinc-300">{capital}</span>
          </div>
          <div className="flex w-full items-center justify-between pt-2">
            <p className="font-medium text-white">Continent</p>
            <span className="text-zinc-300">{continent}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-t-zinc-700 px-4 py-4">
        <Link
          href={`https://open.spotify.com/playlist/${playlistId}`}
          target="_blank"
        >
          <Button className="w-full" tabIndex={-1}>
            Open playlist in Spotify
          </Button>
        </Link>
        <Link
          href={`https://www.google.com/maps/place/${name.replace(/ /g, "+")}`}
          target="_blank"
        >
          <Button className="w-full" variant="secondary" tabIndex={-1}>
            View on Google Maps
          </Button>
        </Link>
      </div>
      {bordering.length !== 0 && (
        <div className="flex flex-col gap-2 border-t border-t-zinc-700 p-4">
          <h2 className="font-medium text-white">Bordering Countries</h2>
          <div className="flex flex-col gap-1">
            {bordering.map((borderingCountryCode, i) => {
              const borderingCountryName = getCountryData(
                borderingCountryCode as TCountryCode
              ).name;

              return (
                <Link href={`/${toKebabCase(borderingCountryName)}`} prefetch={false} key={i}>
                  <Button
                    className="flex w-full items-center justify-start gap-1.5 truncate whitespace-nowrap rounded-md"
                    key={i}
                    variant="ghost"
                    size="sm"
                    tabIndex={-1}
                  >
                    {borderingCountryName}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
