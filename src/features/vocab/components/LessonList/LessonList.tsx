import React, { useState, useMemo } from "react";
import { LessonCard } from "./LessonCard";
import { Input } from "@/components/common/Input/Input";
import { Button } from "@/components/common/Button/Button";
import { Lesson } from "../../types/vocab.types";

interface LessonListProps {
  lessons: Lesson[];
}

export const LessonList: React.FC<LessonListProps> = ({ lessons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const lessonsPerPage = 6;

  // --- Categories derived from lessons ---
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(lessons.map((l) => l.category)))],
    [lessons]
  );

  // --- Filtered lessons based on search & category ---
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || lesson.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [lessons, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const currentLessons = filteredLessons.slice(
    startIndex,
    startIndex + lessonsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* LEFT: Main Lesson List */}
      <div className="lg:col-span-3">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {lessons.length} Lessons for 600 Essential TOEIC Words
        </h2>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-4 md:space-y-0">
          {/* Search Input */}
          <Input
            placeholder="Search lesson (e.g., Office)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // reset page on filter
            }}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Lesson Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
          {currentLessons.length === 0 && (
            <p className="text-gray-500 col-span-full">
              No lessons found for your search/filter.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <Button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                onClick={() => goToPage(i + 1)}
                variant={currentPage === i + 1 ? "primary" : "outline"}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* RIGHT: Stats / Sidebar */}
      <aside className="space-y-6">
        {/* Study Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-3">Your Study Summary</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">
                Total Lessons:
              </span>{" "}
              {lessons.length}
            </p>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all"
                style={{ width: `${(lessons.length / lessons.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recent Lessons */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-3">Recent Lessons</h3>
          <ul className="space-y-2">
            {lessons.slice(0, 3).map((lesson) => (
              <li
                key={lesson.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 transition cursor-pointer border border-transparent hover:border-indigo-200"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="font-medium text-gray-800 truncate"
                    title={lesson.title}
                  >
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500">{lesson.category}</p>
                </div>
                <Button variant="primary" size="sm">
                  Continue
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};
