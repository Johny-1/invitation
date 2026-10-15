"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioPlayerProps {
  audioUrl?: string;
  autoPlay?: boolean;
  onStarted?: () => void;
  className?: string;
  compact?: boolean;
}

export default function AudioPlayer({
  audioUrl,
  autoPlay = true,
  onStarted,
  className = "fixed top-5 left-5 z-50",
  compact = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio safely handling browser autoplay policy
  const attemptPlay = () => {
    if (!audioRef.current || !audioUrl) return;

    audioRef.current.muted = false;
    audioRef.current.volume = 1.0;

    const promise = audioRef.current.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          if (onStarted) onStarted();
        })
        .catch((err) => {
          console.log("Audio autoplay waiting for user interaction:", err?.name);
        });
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (!audioUrl) return;

    // 1. Immediate attempt on mount
    if (autoPlay) {
      attemptPlay();
    }

    // 2. Browser gesture unlock:
    // When the guest touches or clicks anywhere on the screen (the seal, envelope, background),
    // start playing immediately with sound!
    const unlockAndPlay = () => {
      if (audioRef.current && (!isPlaying || audioRef.current.paused)) {
        attemptPlay();
      }
    };

    window.addEventListener("click", unlockAndPlay, { capture: true });
    window.addEventListener("touchstart", unlockAndPlay, { capture: true, passive: true });
    window.addEventListener("pointerdown", unlockAndPlay, { capture: true });
    window.addEventListener("wedding:play-audio", unlockAndPlay);

    return () => {
      window.removeEventListener("click", unlockAndPlay, { capture: true });
      window.removeEventListener("touchstart", unlockAndPlay, { capture: true });
      window.removeEventListener("pointerdown", unlockAndPlay, { capture: true });
      window.removeEventListener("wedding:play-audio", unlockAndPlay);
    };
  }, [audioUrl, autoPlay]);

  if (!audioUrl) return null;

  return (
    <div className={className}>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        playsInline
      />
      <button
        type="button"
        onClick={togglePlay}
        title={isPlaying ? "كتم الموسيقى" : "تشغيل الموسيقى"}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md bg-black/50 border border-amber-400/50 text-amber-200 hover:bg-black/70 hover:border-amber-300 transition-all duration-300 shadow-xl shadow-black/50 group cursor-pointer"
      >
        <div
          className={`relative flex items-center justify-center ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "5s" }}
        >
          <Music className="w-4 h-4 text-amber-300" />
        </div>
        {!compact && (
          <span className="text-xs font-semibold tracking-wide">
            {isPlaying ? "الموسيقى تعمل 🎵" : "تشغيل الموسيقى 🔈"}
          </span>
        )}
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-zinc-400" />
        )}
      </button>
    </div>
  );
}
