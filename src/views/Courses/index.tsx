import React, { useEffect, useState } from "react";
import Link from "next/link";
import CourseCard from "@/components/ui/CourseCard/CourseCard";
import StartTestModal from "@/features/toeic/components/StartTestModal/StartTestModal";
import { CourseType } from "@/types/course";
import { courseService } from "@/services/courseService";

const CoursesPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseType>();
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    courseService.fetchCourses().then((items) => {
      if (active) setCourses(items);
    }).catch((fetchError: unknown) => {
      if (active) {
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load courses.");
      }
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleRetake = (course: CourseType) => {
    setSelectedCourse(course);
    setIsOpen(true);
  };

  if (loading) {
    return <p className="p-8 text-center" role="status">Loading courses...</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-600" role="alert">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-white py-5 px-6">
      {/* Bài làm gần đây */}
      <section className="w-full py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Bài làm gần đây
          </h2>
          <Link
            href="/recent-tests"
            className="text-sm text-sky-500 hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xsm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {courses.length === 0 && (
              <p className="col-span-full text-gray-600">No courses are available yet.</p>
            )}
            {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              retakeText="Làm lại"
              onViewAnswers={() => alert(`Xem đáp án: ${course.title}`)}
              onRetake={() => handleRetake(course)}
            />
            ))}
        </div>
      </section>

      {/* Gạch ngăn */}
      <hr className="my-10 border-gray-300" />

      {/* Danh sách bài thi */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Danh sách bài thi TOEIC
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {courses.length === 0 && (
          <p className="col-span-full text-gray-600">No courses are available yet.</p>
        )}
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onViewAnswers={() => alert(`Xem đáp án: ${course.title}`)}
            onRetake={() => handleRetake(course)}
          />
        ))}
      </div>

      <div className="w-full flex justify-center my-10">
        <Link
          href="/recent-tests"
          className="text-lg text-sky-500 hover:underline"
        >
          Xem thêm
        </Link>
      </div>

      {/* Modal */}
      {selectedCourse && (
        <StartTestModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={selectedCourse.title}
          listeningTime={selectedCourse.listeningTime ?? 45}
          readingTime={selectedCourse.readingTime ?? 75}
          totalTime={selectedCourse.totalTime ?? 120}
          rules={selectedCourse.rules}
          onStart={() => alert(`Bắt đầu: ${selectedCourse.title}`)}
        />
      )}
    </div>
  );
};

export default CoursesPage;
