import React from 'react';
import { Button } from '@/components/common/Button/Button';

interface NavigationProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onJump: (index: number) => void;
  answers: (number | null)[];
  markedQuestionIds: number[];
}

export const Navigation: React.FC<NavigationProps> = ({
  current,
  total,
  onPrev,
  onNext,
  onSubmit,
  onJump,
  answers,
  markedQuestionIds,
}) => {
  return (
    <div className="bg-gray-50 p-4">
      <div className="mb-4 flex flex-wrap justify-center gap-2" aria-label="Question navigation">
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to question ${index + 1}${index === current ? ", current" : ""}${markedQuestionIds.includes(index + 1) ? ", marked for review" : ""}`}
            aria-current={index === current ? "step" : undefined}
            onClick={() => onJump(index)}
            className={`h-9 w-9 rounded border text-sm ${
              index === current
                ? "border-sky-700 bg-sky-700 text-white"
                : answers[index] !== null
                  ? "bg-green-100"
                  : "bg-white"
            } ${markedQuestionIds.includes(index + 1) ? "ring-2 ring-amber-400" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" onClick={onPrev} disabled={current === 0}>Previous</Button>
        <span className="self-center text-sm">Question {current + 1} of {total}</span>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onNext} disabled={current === total - 1}>Next</Button>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};