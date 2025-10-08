import React, { useRef } from 'react';
import { Button } from '@/components/common/Button/Button';
import { Icon } from '@/components/common/Icon/Icon';
import { VocabWord } from '../../types/vocab.types';

interface WordCardProps {
  word: VocabWord;
  isSelected?: boolean;
  onSelect?: () => void;
  onToggleLearned: () => void;
  compact?: boolean; // True for left list (compact), false for detail
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  isSelected = false,
  onSelect,
  onToggleLearned,
  compact = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    // Gọi hàm onSelect (ví dụ để highlight word + load details)
    if (onSelect) onSelect();

    // Phát audio ngay sau khi click
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch(() => console.warn('Audio autoplay prevented.'));
    }
  };

  if (compact) {
    // === COMPACT MODE (sidebar word list) ===
    return (
      <button
        onClick={handleClick}
        className={`relative w-full p-3 rounded-lg border transition-colors flex justify-between items-start
          ${
            isSelected
              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
              : 'hover:bg-gray-50 border-gray-200'
          }`}
      >
        {/* Hidden audio element */}
        <audio ref={audioRef} src={word.audioSrc} />

        {/* Word Info */}
        <div className="flex-1 text-left">
          <h4 className="font-semibold truncate">{word.word}</h4>
          <p
            className={`text-xs italic ${
              isSelected ? 'text-indigo-100' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {word.phonetic}
          </p>
        </div>

        {/* Learn Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Không trigger play khi click icon
            onToggleLearned();
          }}
        >
          <Icon
            name={word.learned ? 'check' : 'book-open'}
            size={16}
            color={isSelected ? '#fff' : 'var(--color-primary)'}
          />
        </Button>
      </button>
    );
  }

  // === FULL MODE (nếu cần hiển thị độc lập) ===
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-2">{word.word}</h3>
      <p className="text-gray-500 italic mb-4">{word.phonetic}</p>
      <p className="text-gray-700">{word.meaning}</p>
      <Button
        variant={word.learned ? 'success' : 'outline'}
        onClick={onToggleLearned}
        className="mt-4"
      >
        {word.learned ? 'Learned' : 'Learn'}
      </Button>
    </div>
  );
};
