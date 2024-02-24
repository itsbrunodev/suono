import { TContinentCode, TCountryCode, getCountryData } from "countries-list";
import { notFound } from "next/navigation";

import { CountryCard } from "@/components/country/card";
import { LOCATIONS } from "@/lib/constants";
import { getContinentName, toTitleCase } from "@/lib/utils";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { countryName: string };
}) {
  const location = LOCATIONS.find(
    (location) => location.name === toTitleCase(params.countryName)
  );

  /* throw 404 error if country name isn't valid */
  if (!location) notFound();

  const locationName = location.name;

  /* country data from countries-list */
  const countryData = location.code
    ? getCountryData(location.code as TCountryCode)
    : { name: "Global", capital: "None", continent: "None", bordering: [] };

  const countryCapital = countryData.capital;
  const countryContinent = countryData.continent;
  const locationPlaylistId = location.playlistId;
  const locationBordering = location.bordering;
  const locationCode = location.code;

  return (
    <div className="flex flex-col-reverse justify-between gap-8 p-8 md:flex-row">
      <div className="flex w-full flex-col gap-8">
        <div>
          <h1 className="text-2xl font-medium text-zinc-100 sm:text-3xl">
            Top 50 Songs - {locationName}
          </h1>
        </div>
        {children}
      </div>
      <CountryCard
        name={locationName}
        capital={countryCapital}
        continent={
          locationName === "Global"
            ? "None"
            : getContinentName(countryContinent as TContinentCode)
        }
        playlistId={locationPlaylistId}
        bordering={locationBordering}
        code={locationCode}
      />
    </div>
  );
}
