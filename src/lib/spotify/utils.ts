import { URLS } from "../constants";
import { TSpotifyPagination, TSpotifyResponseWithError } from "./types/other";
import { ISpotifyPlaylistTrack } from "./types/track";

const { SPOTIFY_CLIENT_ID: ID, SPOTIFY_CLIENT_SECRET: SECRET } = process.env;

let tokenData = {
  accessToken: "",
  expiresAt: 0,
};

async function getAccessToken() {
  if (
    typeof tokenData.expiresAt === "number" &&
    Date.now() < tokenData.expiresAt
  )
    return tokenData.accessToken;

  try {
    const response = await fetch(URLS.spotify.accounts.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${ID}:${SECRET}`).toString(
          "base64"
        )}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      cache: "no-store",
    });

    const res = await response.json();

    if (response.status !== 200) return null;

    /* generate an access token */
    const data = res as {
      access_token: string;
      expires_in: number /* seconds */;
    };

    const accessToken = data.access_token;
    const expiresAt = Date.now() + (data.expires_in - 60) * 1000;

    if (data.access_token !== tokenData.accessToken)
      tokenData = { accessToken, expiresAt };

    return accessToken;
  } catch (error) {
    return null;
  }
}

export async function getPlaylistTracks(str: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${URLS.spotify.api.playlists}/${str}/tracks?market=US`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return (await response.json()) as TSpotifyResponseWithError<
    TSpotifyPagination<ISpotifyPlaylistTrack>
  >;
}
