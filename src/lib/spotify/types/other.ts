export interface ISpotifyImage {
  url: string;
  height: number;
  width: number;
}

export type TSpotifyRestrictionReason = "market" | "product" | "explicit";

export type TSpotifyReleaseDatePrecision = "year" | "month" | "day";

export type TSpotifyAlbumType = "album" | "single" | "compilation";

export type TSpotifyPagination<ItemType> = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: ItemType[];
};

export interface ISpotifyCopyright {
  text: string;
  type: "C" | "P";
}

export type TCategory = "track" | "artist" /* | "all" */;

export type TSpotifyResponseWithError<T = any> =
  | {
      error: { status: number; message: string };
    }
  | (T & { error: undefined });
