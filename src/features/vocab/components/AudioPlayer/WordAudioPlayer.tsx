import React, { useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon/Icon';

interface WordAudioPlayerProps {
  src: string;
  large?: boolean;  // For hero-like large player
}

export const WordAudioPlayer: React.FC<WordAudioPlayerProps> = ({ src, large = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const size = large ? 'w-16 h-16' : 'w-8 h-8';
  const iconSize = large ? 32 : 20;

  return (
    <button onClick={togglePlay} className={`${size} rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition shadow-lg`}>
      <Icon name={isPlaying ? 'pause' : 'volume-2'} size={iconSize} />
      <audio ref={audioRef} src={src} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
    </button>
  );
};