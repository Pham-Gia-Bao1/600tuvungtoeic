import { useState, useMemo } from 'react';
import { Lesson } from '../types/vocab.types';
import { lessons as mockLessons } from '../data/mockVocab';

export const useVocab = () => {
  // ✅ Danh sách bài học
  const [lessonList, setLessonList] = useState<Lesson[]>(mockLessons);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Bộ lọc tìm kiếm
  const filteredLessons = useMemo(() => {
    if (!searchQuery) return lessonList;
    return lessonList.filter((l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [lessonList, searchQuery]);

  // ✅ Hàm tìm kiếm
  const search = (query: string) => setSearchQuery(query);

  // ✅ Toggle trạng thái learned của từ
  const toggleLearned = (lessonId: string, wordId: string) => {
    setLessonList((prevLessons) =>
      prevLessons.map((lesson) => {
        if (lesson.id === lessonId) {
          const updatedWords = lesson.words.map((w) =>
            w.id === wordId ? { ...w, learned: !w.learned } : w
          );
          const learnedCount = updatedWords.filter((w) => w.learned).length;
          const progress = (learnedCount / updatedWords.length) * 100;

          return { ...lesson, words: updatedWords, progress, learnedWords: learnedCount };
        }
        return lesson;
      })
    );
  };

  // ✅ Lấy bài học theo ID
  const getLessonById = (id: string) => lessonList.find((l) => l.id === id);

  // ✅ Lấy bài học tiếp theo
  const getNextLesson = (currentLessonId: string) => {
    const index = lessonList.findIndex((l) => l.id === currentLessonId);
    return index >= 0 ? lessonList[index + 1] : undefined;
  };

  return {
    lessons: lessonList,         // tất cả bài học
    filteredLessons,             // bài học sau khi lọc tìm kiếm
    search,
    toggleLearned,
    getLessonById,
    getNextLesson,               // tiện cho LessonDetailPage
  };
};