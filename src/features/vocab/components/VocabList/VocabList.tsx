import React from 'react';
import { Input } from '@/components/common/Input/Input';
import { VocabWord } from '../../types/vocab.types';
import { VocabCard } from './VocabCard';

interface VocabListProps {
  words: VocabWord[];
  onSearch: (query: string) => void;
  progress: number;
}

export const VocabList: React.FC<VocabListProps> = ({ words, onSearch, progress }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">600 Essential TOEIC Words</h2>
        <div className="text-right">
          <p className="text-sm text-[var(--color-text-secondary)]">Progress: {progress.toFixed(1)}%</p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      <Input
        placeholder="Tìm từ vựng..."
        onChange={(e) => onSearch(e.target.value)}
        className="mb-6 w-full max-w-md"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.slice(0, 20).map((word) => ( // Paginated MVP
          <VocabCard key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
};