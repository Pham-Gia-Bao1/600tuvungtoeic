import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { LessonDetail } from '@/features/vocab/components/LessonDetail/LessonDetail';
import { useVocab } from '@/features/vocab/hooks/useVocab';
import { Icon } from '@/components/common/Icon/Icon';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLessonById, lessons } = useVocab();

  const lesson = getLessonById(id || '');
  if (!lesson) return <div className="p-6 text-center text-gray-500">Lesson not found</div>;

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = lessons[currentIndex + 1];

  return (
    <div className=" flex flex-col mt-16 lg:mt-0 bg-[var(--color-bg-light)]">
      {/* HEADER (Thoát + Next lesson) */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-sm">
        <Link to="/vocab">
          <Button variant="outline" className="flex items-center gap-2">
            <Icon name="next" size={18} /> Thoát
          </Button>
        </Link>

        {nextLesson ? (
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => navigate(`/vocab/lesson/${nextLesson.id}`)}
          >
            Next Lesson <Icon name="previous" size={18} />
          </Button>
        ) : (
         <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            Hết bài học
          </Button>
          <Link to="/vocab">
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
