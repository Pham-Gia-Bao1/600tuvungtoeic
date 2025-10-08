import React from 'react';
import { Button } from '@/components/common/Button/Button';

interface NavigationProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ current, total, onPrev, onNext, onSubmit }) => {
  return (
    <div className="flex justify-between p-4 bg-gray-50">
      <Button variant="outline" onClick={onPrev} disabled={current === 0}>Previous</Button>
      <span className="self-center text-sm">Question {current + 1} of {total}</span>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onNext} disabled={current === total - 1}>Next</Button>
        <Button variant="primary" onClick={onSubmit}>Submit Test</Button>
      </div>
    </div>
  );
};