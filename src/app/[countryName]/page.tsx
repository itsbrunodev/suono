import { TrackCard } from "@/components/track/card";
import { LOCATIONS, URLS } from "@/lib/constants";
import { getPlaylistTracks } from "@/lib/spotify/utils";
import { toTitleCase } from "@/lib/utils";

type TParams = {
  params: { countryName: string };
};

export async function generateMetadata({ params }: TParams) {
  const countryName = toTitleCase(params.countryName);
  const title = `${countryName}`;
  const description = "50 of the most popular songs this month.";

  return {
    metadataBase: new URL(URLS.base),
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Page({ params }: TParams) {
  const location = LOCATIONS.find(
    (location) => location.name === toTitleCase(params.countryName)
  )!;

  const locationPlaylistId = location.playlistId;

  const playlistData = await getPlaylistTracks(locationPlaylistId);

  if (playlistData.error)
    throw Error("error", { cause: 500 }) /* <Error statusCode={500} /> */;

  const playlistTracks = playlistData.items;

  return (
    <div className="flex flex-col gap-4">
      {playlistTracks.map(({ track }, i) => {
        return (
          <div className="flex items-center gap-4" key={i}>
            <TrackCard data={track} />
          </div>
        );
      })}
    </div>
  );
}
