import { createContext } from "react";
import type { Lesson, VocabWord } from "../types/vocab.types";

export type VocabContextValue = {
  lessons: Lesson[];
  filteredLessons: Lesson[];
  dailyReviewWords: VocabWord[];
  progressLoading: boolean;
  progressError: string | null;
  search: (query: string) => void;
  toggleLearned: (lessonId: string, wordId: string) => Promise<void>;
  toggleFavorite: (wordId: string) => Promise<void>;
  recordReview: (wordId: string, wasCorrect: boolean) => Promise<void>;
  getLessonById: (id: string) => Lesson | undefined;
  getNextLesson: (currentLessonId: string) => Lesson | undefined;
};

export const VocabContext = createContext<VocabContextValue | null>(null);
