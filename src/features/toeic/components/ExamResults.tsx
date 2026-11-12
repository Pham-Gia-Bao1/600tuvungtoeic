import React from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import type { Question } from "@/types/toeic";

type ExamResultsProps = {
  questions: Question[];
  answers: (number | null)[];
  elapsedSeconds: number;
  mode: "practice" | "test";
  isSaving: boolean;
  saveError: string | null;
  onRestart: () => void;
};

const formatDuration = (seconds: number): string =>
  `${Math.floor(seconds / 60)}m ${seconds % 60}s`;

export const ExamResults: React.FC<ExamResultsProps> = ({
  questions,
  answers,
  elapsedSeconds,
  mode,
  isSaving,
  saveError,
  onRestart,
}) => {
  const correctCount = questions.reduce(
    (count, question, index) => count + (answers[index] === question.correctAnswer ? 1 : 0),
    0,
  );
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const accuracy = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const partScores = [5, 6, 7].map((partNumber) => {
    const partQuestions = questions
      .map((question, index) => ({ question, answer: answers[index] }))
      .filter(({ question }) => question.partNumber === partNumber);
    const correct = partQuestions.filter(({ question, answer }) => answer === question.correctAnswer).length;
    return { partNumber, total: partQuestions.length, correct };
  });

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-sm font-medium uppercase tracking-wide text-sky-700">
            {mode === "practice" ? "Practice results" : "Test results"}
          </p>
          <h1 className="mt-2 text-3xl font-bold">Reading diagnostic complete</h1>
          <p className="mt-2 text-gray-600">
            This short sample is not a full TOEIC exam. No scaled TOEIC score is calculated.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Correct</p>
              <p className="text-2xl font-bold">{correctCount}/{questions.length}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Accuracy</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Unanswered</p>
              <p className="text-2xl font-bold">{questions.length - answeredCount}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-2xl font-bold">{formatDuration(elapsedSeconds)}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button onClick={onRestart}>Try again</Button>
            <Link href="/courses">
              <Button variant="outline">Exam list</Button>
            </Link>
          </div>
          {isSaving && <p className="mt-4 text-sm text-gray-500" role="status">Saving your attempt...</p>}
          {saveError && <p className="mt-4 text-sm text-red-600" role="alert">{saveError}</p>}
        </section>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Performance by part</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {partScores.map((part) => (
              <div key={part.partNumber} className="rounded-lg border p-4">
                <p className="font-medium">Part {part.partNumber}</p>
                <p className="text-sm text-gray-600">{part.correct} / {part.total} correct</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Answer review</h2>
          {questions.map((question, index) => {
            const selectedAnswer = answers[index];
            const isCorrect = selectedAnswer === question.correctAnswer;

            return (
              <article
                key={question.id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  isCorrect ? "border-green-200" : "border-red-200"
                }`}
              >
                {question.passage && (
                  <p className="mb-3 whitespace-pre-line rounded bg-gray-50 p-3 text-sm leading-relaxed">
                    {question.passage}
                  </p>
                )}
                <h3 className="font-semibold">
                  {index + 1}. Part {question.partNumber}: {question.text}
                </h3>
                <p className={`mt-3 text-sm ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  Your answer: {selectedAnswer === null
                    ? "Not answered"
                    : `${String.fromCharCode(65 + selectedAnswer)}. ${question.options[selectedAnswer]}`}
                </p>
                {!isCorrect && (
                  <p className="mt-1 text-sm text-green-800">
                    Correct answer: {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                  </p>
                )}
                {question.explanation && <p className="mt-2 text-sm text-gray-600">{question.explanation}</p>}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};
