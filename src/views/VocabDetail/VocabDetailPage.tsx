import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button/Button';
import { LessonDetail } from '@/features/vocab/components/LessonDetail/LessonDetail';
import { useVocab } from '@/features/vocab/hooks/useVocab';
import { Icon } from '@/components/common/Icon/Icon';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getLessonById, lessons, progressLoading, progressError } = useVocab();

  if (progressLoading) return <p className="p-6 text-center" role="status">Loading vocabulary...</p>;
  if (progressError) {
    return <p className="p-6 text-center text-red-600" role="alert">{progressError}</p>;
  }
  const lesson = getLessonById(id || '');
  if (!lesson) return <div className="p-6 text-center text-gray-500">Lesson not found</div>;

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = lessons[currentIndex + 1];

  return (
    <div className=" flex flex-col mt-16 lg:mt-0 bg-[var(--color-bg-light)]">
      {progressError && <p className="p-3 text-center text-red-600" role="alert">{progressError}</p>}
      {/* HEADER (Thoát + Next lesson) */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-sm">
        <Link href="/vocab">
          <Button variant="outline" className="flex items-center gap-2">
            <Icon name="next" size={18} /> Thoát
          </Button>
        </Link>

        {nextLesson ? (
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => router.push(`/vocab/lesson/${nextLesson.id}`)}
          >
            Next Lesson <Icon name="previous" size={18} />
          </Button>
        ) : (
         <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            Hết bài học
          </Button>
          <Link href="/vocab">
            <Button variant="primary">Quay về</Button>
          </Link>
            </div>
        )}
      </div>

      {/* Lesson Detail */}
      <LessonDetail lesson={lesson} />
    </div>
  );
};
