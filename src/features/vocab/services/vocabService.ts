import { supabase } from "../../../lib/supabase";
import type { Lesson, VocabWord } from "../types/vocab.types";

type VocabularyLessonRow = {
  id: string;
  sort_order: number;
  content: Omit<Lesson, "words" | "progress" | "totalWords" | "learnedWords">;
};

type VocabularyWordRow = {
  id: string;
  lesson_id: string;
  sort_order: number;
  content: Omit<VocabWord, "learned" | "favorite" | "correctAnswers" | "incorrectAnswers" | "nextReviewAt">;
};

export type VocabularyProgressRecord = {
  word_id: string;
  learned: boolean;
  favorite: boolean;
  repetition_count: number;
  interval_days: number;
  ease_factor: number;
  correct_answers: number;
  incorrect_answers: number;
  next_review_at: string | null;
};

export type VocabularyProgressUpdate = {
  user_id: string;
  word_id: string;
  learned: boolean;
  favorite: boolean;
  repetition_count: number;
  interval_days: number;
  ease_factor: number;
  correct_answers: number;
  incorrect_answers: number;
  next_review_at: string | null;
  updated_at: string;
};

export const vocabService = {
  fetchLessons: async (): Promise<Lesson[]> => {
    const [{ data: lessonData, error: lessonError }, { data: wordData, error: wordError }] =
      await Promise.all([
        supabase
          .from("vocabulary_lessons")
          .select("id, sort_order, content")
          .order("sort_order"),
        supabase
          .from("vocabulary_words")
          .select("id, lesson_id, sort_order, content")
          .order("sort_order"),
      ]);

    if (lessonError) throw lessonError;
    if (wordError) throw wordError;

    const lessons = (lessonData ?? []) as VocabularyLessonRow[];
    const words = (wordData ?? []) as VocabularyWordRow[];
    const wordsByLesson = new Map<string, VocabWord[]>();
    for (const row of words) {
      const lessonWords = wordsByLesson.get(row.lesson_id) ?? [];
      lessonWords.push({ ...row.content, id: row.id });
      wordsByLesson.set(row.lesson_id, lessonWords);
    }

    return lessons.map((row) => {
      const lessonWords = wordsByLesson.get(row.id) ?? [];
      return {
        ...row.content,
        id: row.id,
        words: lessonWords,
        totalWords: lessonWords.length,
        learnedWords: 0,
        progress: 0,
      };
    });
  },

  fetchProgress: async (userId: string): Promise<Map<string, VocabularyProgressRecord>> => {
    const { data, error } = await supabase
      .from("vocabulary_progress")
      .select(
        "word_id, learned, favorite, repetition_count, interval_days, ease_factor, correct_answers, incorrect_answers, next_review_at",
      )
      .eq("user_id", userId);

    if (error) throw error;

    return new Map(
      ((data ?? []) as VocabularyProgressRecord[]).map((record) => [record.word_id, record]),
    );
  },

  saveProgress: async (progress: VocabularyProgressUpdate): Promise<void> => {
    const { error } = await supabase
      .from("vocabulary_progress")
      .upsert(progress, { onConflict: "user_id,word_id" });

    if (error) throw error;
  },

  recordReview: async (wordId: string, wasCorrect: boolean): Promise<void> => {
    const { error } = await supabase.rpc("record_vocabulary_review", {
      p_word_id: wordId,
      p_was_correct: wasCorrect,
    });

    if (error) throw error;
  },
};
