"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "../ui/button";

export function AudioPlayer({ src }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioPlay = () => {
      if (audioRef.current) {
        setIsPlaying(true);
      }
    };

    const handleAudioPause = () => {
      if (audioRef.current) {
        setIsPlaying(false);
      }
    };

    audioRef.current?.addEventListener("play", handleAudioPlay);
    audioRef.current?.addEventListener("pause", handleAudioPause);

    return () => {
      audioRef.current?.removeEventListener("play", handleAudioPlay);
      audioRef.current?.removeEventListener("pause", handleAudioPause);
    };
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      document.querySelectorAll("audio").forEach((audio) => {
        if (audio !== audioRef.current && !audio.paused) {
          audio.pause();
        }
      });

      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      <Button
        className="relative aspect-square h-8 p-0 md:h-10"
        variant={isPlaying ? "default" : "secondary"}
        disabled={!src}
        title={!src ? "No preview available" : undefined}
        aria-label={isPlaying ? "Pause track preview" : "Play track preview"}
        onClick={handleClick}
      >
        {isPlaying ? (
          <PauseIcon className="h-2/5 w-2/5" fill="white" />
        ) : (
          <PlayIcon className="h-2/5 w-2/5" fill="white" />
        )}
      </Button>
      <audio src={src} ref={audioRef} />
    </>
  );
}
