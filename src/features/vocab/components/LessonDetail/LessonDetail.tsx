import React, { useState, useRef, useEffect } from "react";
import { WordCard } from "./WordCard";
import { Button } from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon/Icon";
import { useVocab } from "../../hooks/useVocab";
import { Lesson } from "../../types/vocab.types";
import { WordDetail } from "./WordDetail";

export const LessonDetail: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toggleLearned } = useVocab();

  const selectedWord = lesson.words[selectedWordIndex];

  const handleSelectWord = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedWordIndex(index);
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (isAutoPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsAutoPlaying(false);
    }
  }, [selectedWordIndex, isAutoPlaying]);

  const handleToggleLearned = (wordId: string) =>
    toggleLearned(lesson.id, wordId);

  return (
    <div
      className="
        min-h-screen flex flex-col md:flex-row
        bg-[var(--color-bg-light)]
      "
    >
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
                <audio
                  ref={audioRef}
                  src={selectedWord.audioSrc}
                  preload="auto"
                  className="hidden"
                />

                <div
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.pause();
                      audioRef.current.currentTime = 0;
                      audioRef.current.play().catch(() => {});
                    }
                  }}
                  className="
                    cursor-pointer w-28 h-28 sm:w-40 sm:h-40
                    bg-gray-200 rounded-full flex items-center justify-center
                    hover:bg-gray-300 transition
                  "
                >
                  <Icon name="play" size={40} color="var(--color-primary)" />
                </div>

                <div className="mt-3 text-center">
                  <span className="text-2xl sm:text-3xl italic font-mono text-gray-800">
                    {selectedWord.phonetic}
                  </span>
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