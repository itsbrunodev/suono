import { ISpotifySimplifiedAlbum } from "./album";
import { ISpotifyArtist } from "./artist";
import { TSpotifyRestrictionReason } from "./other";

export interface ISpotifySimplifiedTrack {
  artists: ISpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: { reason: TSpotifyRestrictionReason };
  name: string;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface ISpotifyTrack extends ISpotifySimplifiedTrack {
  album: ISpotifySimplifiedAlbum;
  external_ids: { isrc: string; ean: string; upc: string };
  popularity: number;
}

export interface ISpotifyPlaylistTrack {
  added_at: string | null /* if old playlist -> null */;
  added_by: {
    external_url: { spotify: string };
    followers: { href: null; total: number };
    href: string;
    id: string;
    type: "user";
    uri: string;
  } | null /* if old playlist -> null */;
  is_local: boolean;
  track: ISpotifyTrack /* | { type: "episode" } */;
}
