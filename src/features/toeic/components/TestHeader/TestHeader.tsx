import React from 'react';
import { Timer } from './Timer';
import { Icon } from '@/components/common/Icon/Icon';

interface TestHeaderProps {
  progress: number;
  section: 'listening' | 'reading';
}

export const TestHeader: React.FC<TestHeaderProps> = ({ progress, section }) => {
  return (
    <header className="bg-white border-b border-[var(--color-border)] p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Icon name="book-open" size={24} color="var(--color-primary)" />
        <span className="text-lg font-semibold">TOEIC Test - {section.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <Timer timeLeft={0} /> {/* Pass from hook */}
      </div>
    </header>
  );
};