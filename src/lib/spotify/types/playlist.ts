import { ISpotifyImage, TSpotifyPagination } from "./other";
import { ISpotifyPlaylistTrack } from "./track";

export interface ISpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  owner: {
    external_urls: { spotify: string };
    followers: { href: string; total: number };
    href: string;
    id: string;
    type: "user";
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: TSpotifyPagination<ISpotifyPlaylistTrack>;
  type: string;
  uri: string;
}
