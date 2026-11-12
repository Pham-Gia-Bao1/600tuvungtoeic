import React, { useState, useRef, useEffect } from "react";
import { WordCard } from "./WordCard";
import { Button } from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon/Icon";
import { useVocab } from "../../hooks/useVocab";
import { Lesson } from "../../types/vocab.types";
import { WordDetail } from "./WordDetail";
import { LessonExercisePanel } from "./LessonExercisePanel";
import { LearningModePanel } from "../LearningModePanel";

type LearningMode = "flashcards" | "quiz" | "listening" | "review" | "exercises";

export const LessonDetail: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [meaningRevealed, setMeaningRevealed] = useState(false);
  const [audioError, setAudioError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toggleLearned, toggleFavorite, recordReview, dailyReviewWords, progressError } = useVocab();
  const [mode, setMode] = useState<LearningMode>("flashcards");

  const selectedWord = lesson.words[selectedWordIndex];
  const reviewWordIds = new Set(dailyReviewWords.map((word) => word.id));
  const wordsForMode = mode === "review"
    ? dailyReviewWords.filter((word) => lesson.words.some((lessonWord) => lessonWord.id === word.id))
    : mode === "listening"
      ? lesson.words.filter((word) => Boolean(word.audioSrc) && !word.audioSrc?.includes("example.com"))
      : lesson.words;

  const handleSelectWord = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedWordIndex(index);
    setMeaningRevealed(false);
    setAudioError("");
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    setIsAutoPlaying(false);
    if (selectedWord?.audioSrc && audioRef.current) {
      audioRef.current.play().catch(() => {
        setAudioError("Audio playback failed. Check the word's audio source or try again.");
      });
    }
  }, [selectedWordIndex, isAutoPlaying, selectedWord?.audioSrc]);

  const handleToggleLearned = (wordId: string) =>
    toggleLearned(lesson.id, wordId);
  const handleToggleFavorite = (wordId: string) => toggleFavorite(wordId);

  if (mode !== "flashcards") {
    return (
      <div className="min-h-screen bg-[var(--color-bg-light)] p-4 sm:p-6">
        <div className="mx-auto mb-6 flex max-w-2xl flex-wrap gap-2">
          {(["flashcards", "quiz", "listening", "review", "exercises"] as const).map((item) => (
            <Button
              key={item}
              variant={mode === item ? "primary" : "outline"}
              onClick={() => setMode(item)}
            >
              {item === "review" ? "Due review" : item[0].toUpperCase() + item.slice(1)}
            </Button>
          ))}
        </div>
        {progressError && <p className="mx-auto mb-4 max-w-2xl text-red-600" role="alert">{progressError}</p>}
        {mode === "exercises" ? (
          <LessonExercisePanel
            exercises={lesson.exercises ?? []}
            onAnswer={recordReview}
          />
        ) : (
          <LearningModePanel
            mode={mode}
            words={wordsForMode}
            onAnswer={recordReview}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen flex flex-col md:flex-row
        bg-[var(--color-bg-light)]
      "
    >
      <div className="fixed right-3 top-28 z-20 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2 rounded-lg bg-white/95 p-2 shadow md:right-5">
        {(["flashcards", "quiz", "listening", "review", "exercises"] as const).map((item) => (
          <Button
            key={item}
            size="sm"
            variant={mode === item ? "primary" : "outline"}
            onClick={() => setMode(item)}
          >
            {item === "review" ? `Due (${reviewWordIds.size})` : item[0].toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </div>
      {progressError && <p className="fixed bottom-4 left-4 z-30 rounded bg-white p-3 text-red-600 shadow" role="alert">{progressError}</p>}
      {/* LEFT: Word List */}
      <div
        className="
          w-full md:w-1/3 lg:w-1/4
          bg-white border-b md:border-b-0 md:border-r
          border-[var(--color-border)]
          overflow-y-auto
          max-h-[50vh] md:max-h-screen
          p-4 sm:p-5
        "
      >
        {/* Header */}
        <div className="sticky top-[-20px] bg-white border-b border-[var(--color-border)] pb-3 mb-3 z-10">
          <h2 className="text-lg sm:text-xl font-bold mb-1 break-words">
            {lesson.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            {lesson.words.length} words
          </p>
          <div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {lesson.progress?.toFixed(1)}% complete
            </p>
          </div>
        </div>

        {/* Word list */}
        <div className="space-y-2">
          {lesson.words.map((word, index) => (
            <WordCard
              key={word.id}
              word={word}
              isSelected={index === selectedWordIndex}
              onSelect={() => handleSelectWord(index)}
              onToggleLearned={() => handleToggleLearned(word.id)}
              compact
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Word Detail */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {selectedWord ? (
          <div className="space-y-6">
            {/* Audio / Image Section */}
            <div
              className="
                rounded-lg border border-[var(--color-border)]
                grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6
                p-3 sm:p-4
              "
            >
              {/* Audio Section */}
              <div className="flex flex-col items-center justify-center w-full">
                {selectedWord.audioSrc && (
                  <audio
                    ref={audioRef}
                    src={selectedWord.audioSrc}
                    preload="none"
                    className="hidden"
                  />
                )}

                <button
                  type="button"
                  aria-label={selectedWord.audioSrc ? `Play ${selectedWord.word} pronunciation` : "Audio unavailable"}
                  disabled={!selectedWord.audioSrc}
                  onClick={() => {
                    if (!audioRef.current) {
                      setAudioError("No pronunciation audio is available for this word.");
                      return;
                    }
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(() => {
                      setAudioError("Audio playback failed. Check the word's audio source or try again.");
                    });
                  }}
                  className="
                    cursor-pointer w-28 h-28 sm:w-40 sm:h-40
                    bg-gray-200 rounded-full flex items-center justify-center
                    hover:bg-gray-300 transition disabled:cursor-not-allowed disabled:opacity-60
                  "
                >
                  <Icon name="play" size={40} color="var(--color-primary)" />
                </button>
                {!selectedWord.audioSrc && (
                  <p className="mt-2 text-sm text-gray-500">Audio unavailable for this word.</p>
                )}
                {audioError && <p className="mt-2 text-sm text-red-600" role="alert">{audioError}</p>}

                <div className="mt-3 text-center">
                  {selectedWord.phonetic && (
                    <span className="text-2xl sm:text-3xl italic font-mono text-gray-800">
                      {selectedWord.phonetic}
                    </span>
                  )}
                </div>
              </div>

              {/* Image Section */}
              {selectedWord.imageSrc && (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={selectedWord.imageSrc}
                    alt={selectedWord.word}
                    className="
                      w-full sm:w-60 md:w-72 lg:w-80
                      h-48 sm:h-56 md:h-64
                      object-cover rounded-xl border
                    "
                    loading="lazy"
                  />
                  <p className="text-2xl sm:text-3xl text-gray-700 mt-2 italic text-center">
                    {selectedWord.word}
                  </p>
                </div>
              )}
            </div>

            {/* Word Details */}
            <WordDetail
              word={selectedWord}
              onToggleLearned={() => handleToggleLearned(selectedWord.id)}
              onToggleFavorite={() => handleToggleFavorite(selectedWord.id)}
              revealed={meaningRevealed}
              onToggleReveal={() => setMeaningRevealed((revealed) => !revealed)}
            />

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <Button
                variant="outline"
                onClick={() =>
                  handleSelectWord(Math.max(selectedWordIndex - 1, 0))
                }
                disabled={selectedWordIndex === 0}
                className="w-full sm:w-auto"
              >
                <Icon name="next" size={20} className="mr-2" /> Previous
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleSelectWord(
                    Math.min(selectedWordIndex + 1, lesson.words.length - 1)
                  )
                }
                disabled={selectedWordIndex === lesson.words.length - 1}
                className="w-full sm:w-auto"
              >
                Next <Icon name="previous" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm sm:text-base">
            Select a word to view details
          </div>
        )}
      </div>
    </div>
  );
};