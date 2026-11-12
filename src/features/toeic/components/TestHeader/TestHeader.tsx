import React from 'react';
import { Timer } from './Timer';
import { Icon } from '@/components/common/Icon/Icon';

interface TestHeaderProps {
  progress: number;
  section: 'listening' | 'reading';
  timeLeft: number;
  title: string;
  mode: 'practice' | 'test';
}

export const TestHeader: React.FC<TestHeaderProps> = ({ progress, section, timeLeft, title, mode }) => {
  return (
    <header className="bg-white border-b border-[var(--color-border)] p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Icon name="book-open" size={24} color="var(--color-primary)" />
        <div>
          <span className="block text-lg font-semibold">{title}</span>
          <span className="text-xs text-gray-500">{mode === 'practice' ? 'Practice mode' : 'Test mode'} · {section.toUpperCase()}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <Timer timeLeft={timeLeft} />
      </div>
    </header>
  );
};