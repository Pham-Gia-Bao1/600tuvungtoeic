import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import type { Lesson, VocabWord } from "../types/vocab.types";
import {
  vocabService,
  type VocabularyProgressRecord,
  type VocabularyProgressUpdate,
} from "../services/vocabService";
import { VocabContext } from "./vocabContext";

type ProgressMap = Map<string, VocabularyProgressRecord>;

const emptyProgress = (wordId: string): VocabularyProgressRecord => ({
  word_id: wordId,
  learned: false,
  favorite: false,
  repetition_count: 0,
  interval_days: 0,
  ease_factor: 2.5,
  correct_answers: 0,
  incorrect_answers: 0,
  next_review_at: null,
});

const applyProgress = (
  source: Lesson[],
  records: ProgressMap,
): Lesson[] =>
  source.map((lesson) => {
    const words: VocabWord[] = lesson.words.map((word) => {
      const progress = records.get(word.id);
      return {
        ...word,
        learned: progress?.learned ?? false,
        favorite: progress?.favorite ?? false,
        correctAnswers: progress?.correct_answers ?? 0,
        incorrectAnswers: progress?.incorrect_answers ?? 0,
        nextReviewAt: progress?.next_review_at ?? null,
      };
    });
    const learnedCount = words.filter((word) => word.learned).length;

    return {
      ...lesson,
      words,
      totalWords: words.length,
      learnedWords: learnedCount,
      progress: words.length === 0 ? 0 : (learnedCount / words.length) * 100,
    };
  });

const toProgressUpdate = (
  userId: string,
  wordId: string,
  progress: VocabularyProgressRecord,
): VocabularyProgressUpdate => ({
  user_id: userId,
  word_id: wordId,
  learned: progress.learned,
  favorite: progress.favorite,
  repetition_count: progress.repetition_count,
  interval_days: progress.interval_days,
  ease_factor: progress.ease_factor,
  correct_answers: progress.correct_answers,
  incorrect_answers: progress.incorrect_answers,
  next_review_at: progress.next_review_at,
  updated_at: new Date().toISOString(),
});

const reviewProgress = (
  previous: VocabularyProgressRecord,
  wasCorrect: boolean,
): VocabularyProgressRecord => {
  const repetitionCount = wasCorrect ? previous.repetition_count + 1 : 0;
  const intervalDays = wasCorrect
    ? repetitionCount === 1
      ? 1
      : repetitionCount === 2
        ? 6
        : Math.max(1, Math.round(previous.interval_days * previous.ease_factor))
    : 1;
  const easeFactor = Math.max(1.3, previous.ease_factor + (wasCorrect ? 0.1 : -0.2));

  return {
    ...previous,
    learned: wasCorrect,
    repetition_count: repetitionCount,
    interval_days: intervalDays,
    ease_factor: easeFactor,
    correct_answers: previous.correct_answers + (wasCorrect ? 1 : 0),
    incorrect_answers: previous.incorrect_answers + (wasCorrect ? 0 : 1),
    next_review_at: new Date(Date.now() + intervalDays * 86400000).toISOString(),
  };
};

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Unable to update vocabulary progress.";

export const VocabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const [progressRecords, setProgressRecords] = useState<ProgressMap>(new Map());
  const [lessonList, setLessonList] = useState<Lesson[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (authLoading) {
      return () => {
        active = false;
      };
    }

    setProgressLoading(true);
    setProgressError(null);
    setProgressRecords(new Map());
    setLessonList([]);

    void (async () => {
      try {
        const content = await vocabService.fetchLessons();
        const records = userId
          ? await vocabService.fetchProgress(userId)
          : new Map<string, VocabularyProgressRecord>();
        if (!active) return;
        setProgressRecords(records);
        setLessonList(applyProgress(content, records));
      } catch (error: unknown) {
        if (active) setProgressError(errorMessage(error));
      } finally {
        if (active) setProgressLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [authLoading, userId]);

  const filteredLessons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return query
      ? lessonList.filter((lesson) => lesson.title.toLowerCase().includes(query))
      : lessonList;
  }, [lessonList, searchQuery]);

  const dailyReviewWords = useMemo(() => {
    const now = Date.now();
    return lessonList.flatMap((lesson) => lesson.words).filter((word) => {
      const progress = progressRecords.get(word.id);
      if (!progress?.next_review_at) return false;
      return Date.parse(progress.next_review_at) <= now;
    });
  }, [lessonList, progressRecords]);

  const saveProgress = async (
    wordId: string,
    nextProgress: VocabularyProgressRecord,
  ): Promise<void> => {
    if (userId) await vocabService.saveProgress(toProgressUpdate(userId, wordId, nextProgress));

    const nextRecords = new Map(progressRecords);
    nextRecords.set(wordId, nextProgress);
    setProgressRecords(nextRecords);
    setLessonList(applyProgress(lessonList, nextRecords));
  };

  const toggleLearned = async (lessonId: string, wordId: string) => {
    const lesson = lessonList.find((item) => item.id === lessonId);
    const word = lesson?.words.find((item) => item.id === wordId);
    if (!lesson || !word) {
      setProgressError("The selected vocabulary word could not be found.");
      return;
    }

    const nextProgress = {
      ...(progressRecords.get(wordId) ?? emptyProgress(wordId)),
      learned: !word.learned,
    };
    setProgressError(null);
    try {
      await saveProgress(wordId, nextProgress);
    } catch (error: unknown) {
      setProgressError(errorMessage(error));
    }
  };

  const toggleFavorite = async (wordId: string) => {
    const word = lessonList.flatMap((lesson) => lesson.words).find((item) => item.id === wordId);
    if (!word) {
      setProgressError("The selected vocabulary word could not be found.");
      return;
    }

    const nextProgress = {
      ...(progressRecords.get(wordId) ?? emptyProgress(wordId)),
      favorite: !word.favorite,
    };
    setProgressError(null);
    try {
      await saveProgress(wordId, nextProgress);
    } catch (error: unknown) {
      setProgressError(errorMessage(error));
    }
  };

  const recordReview = async (wordId: string, wasCorrect: boolean) => {
    const word = lessonList.flatMap((lesson) => lesson.words).find((item) => item.id === wordId);
    if (!word) {
      setProgressError("The reviewed vocabulary word could not be found.");
      return;
    }

    const previous = progressRecords.get(wordId) ?? emptyProgress(wordId);
    const nextProgress = reviewProgress(previous, wasCorrect);
    setProgressError(null);
    try {
      if (userId) await vocabService.recordReview(wordId, wasCorrect);
      const nextRecords = new Map(progressRecords);
      nextRecords.set(wordId, nextProgress);
      setProgressRecords(nextRecords);
      setLessonList(applyProgress(lessonList, nextRecords));
    } catch (error: unknown) {
      setProgressError(errorMessage(error));
      throw error;
    }
  };

  const value = {
    lessons: lessonList,
    filteredLessons,
    dailyReviewWords,
    progressLoading,
    progressError,
    search: setSearchQuery,
    toggleLearned,
    toggleFavorite,
    recordReview,
    getLessonById: (id: string) => lessonList.find((lesson) => lesson.id === id),
    getNextLesson: (currentLessonId: string) => {
      const index = lessonList.findIndex((lesson) => lesson.id === currentLessonId);
      return index >= 0 ? lessonList[index + 1] : undefined;
    },
  };

  return <VocabContext.Provider value={value}>{children}</VocabContext.Provider>;
};
