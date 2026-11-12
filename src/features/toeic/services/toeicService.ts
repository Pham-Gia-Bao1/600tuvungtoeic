import { getSupabaseClient } from "../../../lib/supabase";
import type { ExamMode } from "../../../types/toeic";
import type { Question } from "../../../types/toeic";

export type ToeicExam = {
  id: string;
  title: string;
  difficulty: string;
  scoreRange: string;
  available: boolean;
  questionCount: number;
  durationSeconds: number;
  section: string;
};

type ExamRow = {
  id: string;
  sort_order: number;
  duration_seconds: number;
  available: boolean;
  content: ToeicExam;
};

type QuestionRow = {
  exam_id: string;
  question_id: number;
  sort_order: number;
  content: Question;
};

type SaveExamAttempt = {
  userId: string;
  examId: string;
  mode: ExamMode;
  answers: Record<string, number>;
  markedQuestionIds: number[];
  correctCount: number;
  totalQuestions: number;
  durationSeconds: number;
};

export type ToeicExamAttempt = {
  id: string;
  exam_id: string;
  mode: ExamMode;
  correct_count: number;
  total_questions: number;
  duration_seconds: number;
  submitted_at: string;
};

export const toeicService = {
  fetchExams: async (): Promise<ToeicExam[]> => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("toeic_exams")
      .select("id, sort_order, duration_seconds, available, content")
      .order("sort_order");
    if (error) throw error;
    return ((data ?? []) as ExamRow[]).map((row) => row.content);
  },

  fetchExam: async (examId: string): Promise<{ exam: ToeicExam; questions: Question[] }> => {
    const supabase = getSupabaseClient();
    const [{ data: examData, error: examError }, { data: questionData, error: questionError }] =
      await Promise.all([
        supabase
          .from("toeic_exams")
          .select("id, sort_order, duration_seconds, available, content")
          .eq("id", examId)
          .maybeSingle(),
        supabase
          .from("toeic_exam_questions")
          .select("exam_id, question_id, sort_order, content")
          .eq("exam_id", examId)
          .order("sort_order"),
      ]);

    if (examError) throw examError;
    if (questionError) throw questionError;
    if (!examData) throw new Error("This exam does not exist.");

    const questions = ((questionData ?? []) as QuestionRow[]).map((row) => row.content);
    return { exam: (examData as ExamRow).content, questions };
  },

  saveAttempt: async (attempt: SaveExamAttempt): Promise<void> => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("toeic_exam_attempts").insert({
      user_id: attempt.userId,
      exam_id: attempt.examId,
      mode: attempt.mode,
      answers: attempt.answers,
      marked_question_ids: attempt.markedQuestionIds,
      correct_count: attempt.correctCount,
      total_questions: attempt.totalQuestions,
      duration_seconds: attempt.durationSeconds,
    });

    if (error) throw error;
  },

  fetchAttempts: async (userId: string): Promise<ToeicExamAttempt[]> => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("toeic_exam_attempts")
      .select("id, exam_id, mode, correct_count, total_questions, duration_seconds, submitted_at")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as ToeicExamAttempt[];
  },
};
