import React from 'react';
import { Button } from '@/components/common/Button/Button';
import { Icon } from '@/components/common/Icon/Icon';
import { Link } from 'react-router-dom';
import { VocabWord } from '../../types/vocab.types';

interface VocabCardProps {
  word: VocabWord;
}

export const VocabCard: React.FC<VocabCardProps> = ({ word }) => {
  return (
    <div className="card p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold">{word.word}</h3>
          <p className="text-sm text-[var(--color-text-secondary)] italic">{word.phonetic}</p>
          <p className="mt-2 text-gray-600">{word.meaning.substring(0, 100)}...</p>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <Icon name="volume-2" size={20} className="cursor-pointer text-[var(--color-primary)]" /> {/* Play audio on click */}
          <Link to={`/vocab/${word.id}`}>
            <Button variant="ghost" size="sm">
              Chi tiết
            </Button>
          </Link>
          <Button variant={word.learned ? 'primary' : 'outline'} size="sm" onClick={() => { /* toggle */ }}>
            {word.learned ? <Icon name="check" /> : 'Learn'}
          </Button>
        </div>
      </div>
    </div>
  );
};