import React, { useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon/Icon';

interface AudioPlayerProps {
  src: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
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

  return (
    <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded">
      <button onClick={togglePlay} className="p-2 hover:bg-gray-200 rounded">
        <Icon name={isPlaying ? 'pause' : 'play'} size={20} />
      </button>
      <audio ref={audioRef} src={src} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <span className="text-sm text-[var(--color-text-secondary)]">Play audio to answer</span>
    </div>
  );
};