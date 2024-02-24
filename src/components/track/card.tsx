import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { ISpotifyTrack } from "@/lib/spotify/types/track";

import { AudioPlayer } from "./audio-player";

function TrackAlbumCover({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-[inherit] rounded-md bg-zinc-800">
      <Image
        className="w-[inherit] rounded-[inherit]"
        src={src}
        alt={alt}
        width={128}
        height={128}
        draggable={false}
      />
    </div>
  );
}

export function TrackCard({ data }: { data: ISpotifyTrack }) {
  const track = data;

  return (
    <div className="flex items-center gap-4">
      <div className="relative aspect-square w-20">
        <TrackAlbumCover
          src={track.album.images[0].url}
          alt={track.album.name}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <AudioPlayer src={track.preview_url} />
        </div>
      </div>{" "}
      <div className="flex flex-col">
        <Link
          className="text-lg font-medium text-white hover:underline"
          href={track.external_urls.spotify}
          target="_blank"
        >
          {track.name}
        </Link>
        <div className="flex text-sm font-light flex-wrap">
          {track.artists.map((artist, i) => (
            <Fragment key={i}>
              <Link
                className="transition-colors hover:text-white hover:underline"
                href={artist.external_urls.spotify}
                target="_blank"
              >
                {artist.name}
              </Link>
              {i !== track.artists.length - 1 && (
                <span className="mr-1 inline-flex">, </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
