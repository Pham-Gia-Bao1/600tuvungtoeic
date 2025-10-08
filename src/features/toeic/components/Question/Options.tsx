import React from 'react';

interface OptionsProps {
  options: string[];
  selected: number | null;
  onSelect: (ans: number) => void;
}

export const Options: React.FC<OptionsProps> = ({ options, selected, onSelect }) => {
  return (
    <div className="space-y-2 mt-4">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`w-full p-3 text-left border rounded-md transition-colors ${
            selected === idx ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-100'
          }`}
        >
          {String.fromCharCode(65 + idx)}. {opt}
        </button>
      ))}
    </div>
  );
};