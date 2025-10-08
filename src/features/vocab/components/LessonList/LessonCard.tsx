import React from "react";
import { Button } from "@/components/common/Button/Button";
import { Link } from "react-router-dom";
import { Lesson } from "../../types/vocab.types";

interface LessonCardProps {
  lesson: Lesson;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl  transition-all duration-300 overflow-hidden border border-indigo-100 flex flex-col h-full">
      {/* Image Section */}
      {lesson.image && (
        <div className="w-full h-40 overflow-hidden relative">
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-white/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600">
            {lesson.words.length} words
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3
            className="text-lg font-semibold text-gray-900 mb-2 truncate"
            title={lesson.title}
          >
            {lesson.title}
          </h3>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {lesson.progress?.toFixed(1)}% complete
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button variant="primary">
          <Link
            to={`/vocab/lesson/${lesson.id}`}
            className="block w-full text-center"
          >
            Start Lesson
          </Link>
        </Button>
      </div>
    </div>
  );
};
