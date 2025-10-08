import React from "react";
import { LessonList } from "@/features/vocab/components/LessonList/LessonList";
import { useVocab } from "@/features/vocab/hooks/useVocab";

export const VocabPage: React.FC = () => {
  const { filteredLessons } = useVocab();

  return (
    <div className="min-h-screen w-[100vw] mt-10  p-4">
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

      {/* Lesson List */}
      <LessonList lessons={filteredLessons} />
    </div>
  );
};
