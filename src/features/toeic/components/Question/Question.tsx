import React from 'react';
import { Options } from './Options';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { Question as QType } from '@/types/toeic';

interface QuestionProps {
  question: QType;
  selectedAnswer: number | null;
  onSelect: (ans: number) => void;
}

export const Question: React.FC<QuestionProps> = ({ question, selectedAnswer, onSelect }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
      {question.audioSrc && <AudioPlayer src={question.audioSrc} />}
      <Options options={question.options} selected={selectedAnswer} onSelect={onSelect} />
    </div>
  );
};