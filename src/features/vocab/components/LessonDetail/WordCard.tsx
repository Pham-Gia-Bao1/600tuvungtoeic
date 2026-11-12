import React from 'react';
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
  const handleClick = () => {
    if (onSelect) onSelect();
  };

  if (compact) {
    return (
      <div
        className={`relative w-full p-3 rounded-lg border transition-colors flex justify-between items-start
          ${
            isSelected
              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
              : 'hover:bg-gray-50 border-gray-200'
          }`}
      >
        <button
          type="button"
          onClick={handleClick}
          aria-pressed={isSelected}
          className="flex min-w-0 flex-1 items-start text-left"
        >
          <div className="flex-1">
            <h4 className="font-semibold truncate">{word.word}</h4>
            {word.phonetic && (
              <p
                className={`text-xs italic ${
                  isSelected ? 'text-indigo-100' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {word.phonetic}
              </p>
            )}
          </div>
        </button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label={word.learned ? `Mark ${word.word} as not learned` : `Mark ${word.word} as learned`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLearned();
          }}
        >
          <Icon
            name={word.learned ? 'check' : 'book-open'}
            size={16}
            color={isSelected ? '#fff' : 'var(--color-primary)'}
          />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-2">{word.word}</h3>
      {word.phonetic && <p className="text-gray-500 italic mb-4">{word.phonetic}</p>}
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
