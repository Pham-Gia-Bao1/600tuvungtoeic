import React from 'react';
import { Options } from './Options';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { Question as QType } from '@/types/toeic';

interface QuestionProps {
  question: QType;
  selectedAnswer: number | null;
  onSelect: (ans: number) => void;
  questionNumber: number;
  flagged: boolean;
  onToggleFlag: () => void;
  showFeedback?: boolean;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  onSelect,
  questionNumber,
  flagged,
  onToggleFlag,
  showFeedback = false,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      {question.passage && (
        <div className="mb-5 whitespace-pre-line rounded-lg bg-gray-50 p-4 leading-relaxed">
          {question.passage}
        </div>
      )}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">
          Question {questionNumber} · Part {question.partNumber}
        </h3>
        <button
          type="button"
          aria-pressed={flagged}
          onClick={onToggleFlag}
          className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          {flagged ? "Remove review mark" : "Mark for review"}
        </button>
      </div>
      <p className="mb-4">{question.text}</p>
      {question.audioSrc && <AudioPlayer src={question.audioSrc} />}
      <Options options={question.options} selected={selectedAnswer} onSelect={onSelect} />
      {showFeedback && selectedAnswer !== null && (
        <div className={`mt-4 rounded-lg p-4 ${isCorrect ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"}`}>
          <p className="font-semibold">{isCorrect ? "Correct" : "Incorrect"}</p>
          {question.explanation && <p className="mt-1">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};