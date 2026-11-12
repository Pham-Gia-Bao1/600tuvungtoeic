import React from "react";
import Link from "next/link";
import { LessonList } from "@/features/vocab/components/LessonList/LessonList";
import { useVocab } from "@/features/vocab/hooks/useVocab";

export const VocabPage: React.FC = () => {
  const { filteredLessons, progressLoading, progressError, dailyReviewWords, lessons } = useVocab();
  const learnedCount = lessons.reduce((count, lesson) => count + (lesson.learnedWords ?? 0), 0);
  const totalWords = lessons.reduce((count, lesson) => count + lesson.words.length, 0);

  return (
    <div className="mt-10 w-full min-w-0 p-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl text-white p-8 mb-10  flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Vocabulary Library</h1>
          <p className="text-sm opacity-90 text-gray-50">
            Enhance your English vocabulary through engaging lessons.
          </p>
        </div>
        <img
          src="/images/600toeic-cover-section.png"
          alt="Library illustration"
          className="w-120 h-50 object-cover hidden md:block"
        />
      </div>

      <section className="mb-8 grid gap-4 rounded-xl bg-white p-5 shadow-sm sm:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">Words learned</p>
          <p className="text-2xl font-bold">{learnedCount} / {totalWords}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Due for review</p>
          <p className="text-2xl font-bold">{dailyReviewWords.length}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700" href="/vocab/review">
            Daily review
          </Link>
          <Link className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50" href="/vocab/favorites">
            Favorites
          </Link>
        </div>
      </section>

      {/* Lesson List */}
      {progressLoading && <p className="mb-4 text-center" role="status">Loading vocabulary...</p>}
      {progressError && <p className="mb-4 text-red-600" role="alert">{progressError}</p>}
      {!progressLoading && <LessonList lessons={filteredLessons} />}
    </div>
  );
};
