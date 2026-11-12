import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import type { VocabWord } from "../types/vocab.types";

type LearningMode = "quiz" | "listening" | "review";

type Choice = {
  id: string;
  label: string;
};

type LearningModePanelProps = {
  mode: LearningMode;
  words: VocabWord[];
  onAnswer: (wordId: string, wasCorrect: boolean) => Promise<void>;
};

const shuffle = <T,>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

export const LearningModePanel: React.FC<LearningModePanelProps> = ({
  mode,
  words,
  onAnswer,
}) => {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const word = words[index];

  const choices = useMemo(() => {
    if (!word) return [];

    if (mode === "listening") {
      const distractors = words
        .filter((candidate) => candidate.id !== word.id && candidate.word !== word.word)
        .map((candidate) => ({ id: candidate.id, label: candidate.word }));
      return shuffle([{ id: word.id, label: word.word }, ...shuffle(distractors).slice(0, 3)]);
    }

    const distractors = Array.from(
      new Map(
        words
          .filter((candidate) => candidate.id !== word.id)
          .filter((candidate) => candidate.vietnameseMeaning !== word.vietnameseMeaning)
          .map((candidate) => [
            candidate.vietnameseMeaning,
            { id: candidate.id, label: candidate.vietnameseMeaning },
          ]),
      ).values(),
    );
    return shuffle([
      { id: word.id, label: word.vietnameseMeaning },
      ...shuffle(distractors).slice(0, 3),
    ]);
  }, [mode, word, words]);

  useEffect(() => {
    setAnswer(null);
    setFeedback(null);
    setError(null);
  }, [index, mode, word?.id]);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      setError("Audio playback failed. Check the word's audio source or try again.");
    });
  };

  const submitAnswer = async (choice: Choice) => {
    if (!word || answer || saving) return;

    const wasCorrect = choice.id === word.id;
    setSaving(true);
    setError(null);
    try {
      await onAnswer(word.id, wasCorrect);
      setAnswer(choice.id);
      setFeedback(wasCorrect ? "Correct!" : `Not quite. The answer is ${word.word}.`);
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save this review.");
    } finally {
      setSaving(false);
    }
  };

  if (words.length === 0) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          {mode === "listening" ? "No audio available" : "You’re all caught up"}
        </h2>
        <p className="mt-2 text-gray-600">
          {mode === "listening"
            ? "This topic has no words with an audio source yet."
            : "No words are due for review right now."}
        </p>
      </section>
    );
  }

  if (!word) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">Review complete</h2>
        <p className="mt-2 text-gray-600">You reviewed {words.length} words.</p>
        <Button className="mt-5" onClick={() => setIndex(0)}>Review again</Button>
      </section>
    );
  }

  const prompt = mode === "listening" ? "Listen and choose the word" : "Choose the Vietnamese meaning";

  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>{mode === "review" ? "Daily review" : mode === "listening" ? "Listening quiz" : "Vocabulary quiz"}</span>
        <span>{index + 1} / {words.length}</span>
      </div>
      <h2 className="text-center text-xl font-semibold">{prompt}</h2>

      {mode === "listening" ? (
        <div className="my-8 flex justify-center">
          {word.audioSrc ? (
            <>
              <audio ref={audioRef} src={word.audioSrc} preload="none" />
              <Button onClick={playAudio}>Play pronunciation</Button>
            </>
          ) : (
            <p className="text-gray-600">No pronunciation audio is available for this word.</p>
          )}
        </div>
      ) : (
        <div className="my-8 text-center">
          <p className="text-3xl font-bold">{word.word}</p>
          {word.phonetic && <p className="mt-2 text-gray-500">{word.phonetic}</p>}
        </div>
      )}

      <div className="grid gap-3">
        {choices.map((choice, choiceIndex) => {
          const isCorrect = choice.id === word.id;
          const isSelected = answer === choice.id;
          const resultClass = answer && isCorrect
            ? "border-green-600 bg-green-50"
            : answer && isSelected
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:border-sky-400";

          return (
            <button
              key={`${choice.id}-${choiceIndex}`}
              className={`rounded-lg border p-3 text-left transition-colors disabled:cursor-default ${resultClass}`}
              disabled={Boolean(answer) || saving}
              onClick={() => void submitAnswer(choice)}
              type="button"
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      {feedback && <p className="mt-4 font-medium" role="status">{feedback}</p>}
      {error && <p className="mt-4 text-red-600" role="alert">{error}</p>}
      {answer && (
        <div className="mt-5 flex justify-end">
          <Button onClick={() => setIndex((current) => current + 1)}>Next word</Button>
        </div>
      )}
    </section>
  );
};
