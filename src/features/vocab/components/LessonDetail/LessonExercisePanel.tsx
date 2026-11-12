import React, { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import type { LessonExercise } from "../../types/vocab.types";

type LessonExercisePanelProps = {
  exercises: LessonExercise[];
  onAnswer: (wordId: string, wasCorrect: boolean) => Promise<void>;
};

export const LessonExercisePanel: React.FC<LessonExercisePanelProps> = ({
  exercises,
  onAnswer,
}) => {
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const exercise = exercises[index];

  const submitAnswer = async (option: string) => {
    if (!exercise || selectedAnswer || saving) return;

    const correct = option === exercise.answer;
    setSaving(true);
    setError(null);
    try {
      await onAnswer(exercise.wordId, correct);
      setSelectedAnswer(option);
      if (correct) setScore((current) => current + 1);
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save this exercise result.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (exercises.length === 0) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">Exercises coming soon</h2>
        <p className="mt-2 text-gray-600">This lesson has no authored exercises yet.</p>
      </section>
    );
  }

  if (!exercise) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">Lesson complete</h2>
        <p className="mt-2 text-gray-600">
          You answered {score} of {exercises.length} questions correctly.
        </p>
        <Button
          className="mt-5"
          onClick={() => {
            setIndex(0);
            setScore(0);
            setSelectedAnswer(null);
          }}
        >
          Try again
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Lesson exercise</span>
        <span>{index + 1} / {exercises.length}</span>
      </div>
      <h2 className="text-xl font-semibold">{exercise.prompt}</h2>
      <div className="mt-6 grid gap-3">
        {exercise.options.map((option) => {
          const correct = selectedAnswer !== null && option === exercise.answer;
          const incorrect = selectedAnswer === option && option !== exercise.answer;
          const resultClass = correct
            ? "border-green-600 bg-green-50"
            : incorrect
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:border-sky-400";

          return (
            <button
              key={option}
              className={`rounded-lg border p-3 text-left transition-colors disabled:cursor-default ${resultClass}`}
              disabled={Boolean(selectedAnswer) || saving}
              onClick={() => void submitAnswer(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
      {selectedAnswer && (
        <div className="mt-5 space-y-3" role="status">
          <p className="font-medium">
            {selectedAnswer === exercise.answer ? "Correct!" : `The answer is ${exercise.answer}.`}
          </p>
          <p className="text-gray-700">{exercise.explanation}</p>
          <div className="flex justify-end">
            <Button onClick={() => {
              setIndex((current) => current + 1);
              setSelectedAnswer(null);
            }}>
              Next question
            </Button>
          </div>
        </div>
      )}
      {error && <p className="mt-4 text-red-600" role="alert">{error}</p>}
    </section>
  );
};
