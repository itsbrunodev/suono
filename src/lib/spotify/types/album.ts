import { ISpotifySimplifiedArtist } from "./artist";
import {
  ISpotifyCopyright,
  ISpotifyImage,
  TSpotifyAlbumType,
  TSpotifyPagination,
  TSpotifyReleaseDatePrecision,
  TSpotifyRestrictionReason,
} from "./other";
import { ISpotifySimplifiedTrack } from "./track";

export interface ISpotifySimplifiedAlbum {
  album_type: TSpotifyAlbumType;
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: TSpotifyReleaseDatePrecision;
  restrictions: { reason: TSpotifyRestrictionReason };
  type: "album";
  uri: string;
  artists: ISpotifySimplifiedArtist[];
}

export interface ISpotifyAlbum extends ISpotifySimplifiedAlbum {
  tracks: TSpotifyPagination<ISpotifySimplifiedTrack>;
  copyrights: ISpotifyCopyright[];
  external_ids: { isrc: string; ean: string; upc: string };
  genres: string[];
  label: string;
  popularity: number;
}
