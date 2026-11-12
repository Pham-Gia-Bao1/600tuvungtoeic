import React, { useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon/Icon';

interface WordAudioPlayerProps {
  src?: string;
  large?: boolean;  // For hero-like large player
}

export const WordAudioPlayer: React.FC<WordAudioPlayerProps> = ({ src, large = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  const togglePlay = () => {
    if (!src || !audioRef.current) return;
    setError("");
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current.play().catch(() => {
        setError("Audio playback failed.");
      });
    }
  };

  const size = large ? 'w-16 h-16' : 'w-8 h-8';
  const iconSize = large ? 32 : 20;

  return (
    <div>
      <button
        type="button"
        aria-label={src ? "Play pronunciation" : "Audio unavailable"}
        disabled={!src}
        onClick={togglePlay}
        className={`${size} rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition shadow-lg disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <Icon name={isPlaying ? 'pause' : 'volume-2'} size={iconSize} />
      </button>
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => setError("Audio source could not be loaded.")}
        />
      )}
      {error && <span className="sr-only" role="alert">{error}</span>}
    </div>
  );
};