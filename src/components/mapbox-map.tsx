"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "next/navigation";
import { useRef } from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl";

import {
  LOCATIONS,
  MAPBOX_INITIAL_ZOOM,
  MAPBOX_TRANSITION_DURATION,
} from "@/lib/constants";
import { toKebabCase, toTitleCase } from "@/lib/utils";

export function MapboxMap() {
  const ref = useRef<MapRef>(null);

  const params = useParams<{ countryName: string }>();

  function resetPosition() {
    if (!ref.current) return;
    ref.current.flyTo({
      center: [0, 0],
      duration: MAPBOX_TRANSITION_DURATION,
      pitch: 0,
      zoom: MAPBOX_INITIAL_ZOOM,
    });
  }

  if (params.countryName && ref.current) {
    const formattedCountryName = toTitleCase(params.countryName);
    const location = LOCATIONS.find((x) => x.name === formattedCountryName);

    if (location) {
      if (location.name === "Global") resetPosition();
      else
        ref.current.fitBounds(
          location.bounding as [number, number, number, number],
          {
            padding: 40,
            duration: MAPBOX_TRANSITION_DURATION,
            pitch: 40,
            offset: [0, -40],
          }
        );
    }
  } else if (!params.countryName) resetPosition();

  return (
    <Map
      ref={ref}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/dark-v11"}
      initialViewState={{
        latitude: 0,
        longitude: 0,
        pitch: 0,
        zoom: MAPBOX_INITIAL_ZOOM,
      }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
      projection={{ name: "globe" }}
    >
      {params.countryName === "global" ||
        (LOCATIONS.find(
          (location) => toKebabCase(location.name) === params.countryName
        ) && (
          <>
            <Source
              id="country-highlight-source"
              type="geojson"
              data={`https://raw.githubusercontent.com/georgique/world-geojson/develop/countries/${(params.countryName === "united-states" ? "usa" : params.countryName === "czech-republic" ? "czech" : params.countryName).replace(/-/g, "_")}.json`}
            />
            <Layer
              id="country-highlight-fill"
              type="fill"
              source="country-highlight-source"
              paint={{
                "fill-color": "#fff",
                "fill-opacity": 0.1,
                "fill-opacity-transition": {
                  duration: MAPBOX_TRANSITION_DURATION,
                },
              }}
            />
            <Layer
              id="country-highlight-outline"
              type="line"
              source="country-highlight-source"
              paint={{
                "line-color": "#fff",
                "line-opacity": 0.5,
                "line-opacity-transition": {
                  duration: MAPBOX_TRANSITION_DURATION,
                },
              }}
            />
          </>
        ))}
    </Map>
  );
}
