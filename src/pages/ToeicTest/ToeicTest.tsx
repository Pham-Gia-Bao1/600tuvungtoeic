import { Navigation } from '@/features/toeic/components/Navigation/Navigation';
import { Question } from '@/features/toeic/components/Question/Question';
import { TestHeader } from '@/features/toeic/components/TestHeader/TestHeader';
import { useTest } from '@/features/toeic/hooks/useTest';
import React from 'react';

export const ToeicTest: React.FC = () => {
  const {
    questions,
    answers,
    currentQuestion,
    // timeLeft,
    section,
    isSubmitted,
    progress,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
  } = useTest();

  if (isSubmitted) {
    return <div className="p-8 text-center">Test Submitted! Score: Coming soon...</div>;
  }

  const question = questions[currentQuestion];
  const selected = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <TestHeader progress={progress} section={section} />
      <main className="flex-1 p-4">
        <Question question={question} selectedAnswer={selected} onSelect={selectAnswer} />
      </main>
      <Navigation
        current={currentQuestion}
        total={questions.length}
        onPrev={prevQuestion}
        onNext={nextQuestion}
        onSubmit={submitTest}
      />
    </div>
  );
};