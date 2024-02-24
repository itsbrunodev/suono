import { ISpotifyImage } from "./other";

export interface ISpotifySimplifiedArtist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface ISpotifyArtist extends ISpotifySimplifiedArtist {
  followers: { href: null; total: number };
  genres: string[];
  images: ISpotifyImage[];
  popularity: number;
}
