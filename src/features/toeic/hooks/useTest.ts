import { useCallback, useEffect, useRef, useState } from "react";
import type { ExamMode, Question } from "@/types/toeic";
import { toeicService, type ToeicExam } from "../services/toeicService";

type SavedAttempt = {
  answers: Record<string, number>;
  markedQuestionIds: number[];
  currentQuestion: number;
  timeLeft: number;
  isSubmitted: boolean;
  startedAt: number;
  elapsedSeconds: number;
};

const DEFAULT_EXAM_DURATION_SECONDS = 15 * 60;

const getStorageKey = (examId: string, mode: ExamMode, userId?: string): string =>
  `toeic-attempt:${userId ?? "guest"}:${examId}:${mode}`;

const createAttempt = (durationSeconds = DEFAULT_EXAM_DURATION_SECONDS): SavedAttempt => ({
  answers: {},
  markedQuestionIds: [],
  currentQuestion: 0,
  timeLeft: durationSeconds,
  isSubmitted: false,
  startedAt: Date.now(),
  elapsedSeconds: 0,
});

const readAttempt = (
  key: string,
  durationSeconds: number,
  questions: Question[],
): SavedAttempt => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return createAttempt(durationSeconds);
    const parsed: unknown = JSON.parse(saved);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "answers" in parsed &&
      "markedQuestionIds" in parsed &&
      "currentQuestion" in parsed &&
      "timeLeft" in parsed &&
      "isSubmitted" in parsed &&
      "startedAt" in parsed &&
      "elapsedSeconds" in parsed &&
      typeof parsed.answers === "object" &&
      parsed.answers !== null &&
      Array.isArray(parsed.markedQuestionIds) &&
      typeof parsed.currentQuestion === "number" &&
      typeof parsed.timeLeft === "number" &&
      typeof parsed.isSubmitted === "boolean" &&
      typeof parsed.startedAt === "number" &&
      typeof parsed.elapsedSeconds === "number"
    ) {
      const restored = parsed as SavedAttempt;
      const questionIds = new Set(questions.map((question) => question.id));
      const questionsById = new Map(questions.map((question) => [question.id, question]));
      return {
        ...restored,
        answers: Object.fromEntries(
          Object.entries(restored.answers).filter(([id, answer]) => {
            const question = questionsById.get(Number(id));
            return question && Number.isInteger(answer) &&
              answer >= 0 && answer < question.options.length;
          }),
        ),
        markedQuestionIds: restored.markedQuestionIds.filter(
          (id): id is number => Number.isInteger(id) && questionIds.has(id),
        ),
        currentQuestion: Math.max(0, Math.min(restored.currentQuestion, questions.length - 1)),
        timeLeft: Math.max(0, Math.min(restored.timeLeft, durationSeconds)),
        elapsedSeconds: Math.max(0, Math.min(restored.elapsedSeconds, durationSeconds)),
      };
    }
    return createAttempt(durationSeconds);
  } catch {
    return createAttempt(durationSeconds);
  }
};

export const useTest = (
  examId: string,
  mode: ExamMode,
  userId?: string,
) => {
  const storageKey = getStorageKey(examId, mode, userId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exam, setExam] = useState<ToeicExam | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);
  const [attemptLoaded, setAttemptLoaded] = useState(false);
  const [attempt, setAttempt] = useState<SavedAttempt>(() => createAttempt());
  const [isPaused, setIsPaused] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const submittedRef = useRef(attempt.isSubmitted);

  useEffect(() => {
    let active = true;
    setQuestionsLoading(true);
    setQuestionsError(null);
    setAttemptLoaded(false);

    toeicService.fetchExam(examId).then(({ exam: loadedExam, questions: loadedQuestions }) => {
      if (!active) return;
      setExam(loadedExam);
      setQuestions(loadedQuestions);
      const restored = readAttempt(storageKey, loadedExam.durationSeconds, loadedQuestions);
      setAttempt(restored);
      submittedRef.current = restored.isSubmitted;
      if (!loadedExam.available || loadedQuestions.length === 0) {
        setQuestionsError("This exam is not available yet.");
      }
      setAttemptLoaded(true);
    }).catch((error: unknown) => {
      if (!active) return;
      setQuestionsError(error instanceof Error ? error.message : "Unable to load this exam.");
      setQuestions([]);
    }).finally(() => {
      if (active) setQuestionsLoading(false);
    });

    return () => {
      active = false;
    };
  }, [examId, storageKey]);

  const submitTest = useCallback(async (automatic = false) => {
    if (submittedRef.current || !attemptLoaded || questions.length === 0) return;
    submittedRef.current = true;
    const durationSeconds = exam?.durationSeconds ?? DEFAULT_EXAM_DURATION_SECONDS;
    setAttempt((current) => {
      const completed = {
        ...current,
        isSubmitted: true,
        elapsedSeconds: Math.min(
          durationSeconds,
          current.elapsedSeconds + Math.max(0, Math.floor((Date.now() - current.startedAt) / 1000)),
        ),
      };
      localStorage.setItem(storageKey, JSON.stringify(completed));
      return completed;
    });

    if (userId) {
      setIsSaving(true);
      setSaveError(null);
      try {
        const answerSnapshot = attempt.answers;
        const correctCount = questions.reduce(
          (count, question) => count + (answerSnapshot[String(question.id)] === question.correctAnswer ? 1 : 0),
          0,
        );
        await toeicService.saveAttempt({
          userId,
          examId,
          mode,
          answers: answerSnapshot,
          markedQuestionIds: attempt.markedQuestionIds,
          correctCount,
          totalQuestions: questions.length,
          durationSeconds: attempt.elapsedSeconds + Math.floor((Date.now() - attempt.startedAt) / 1000),
        });
      } catch (error: unknown) {
        setSaveError(
          error instanceof Error
            ? `Attempt saved locally, but Supabase sync failed: ${error.message}`
            : "Attempt saved locally, but Supabase sync failed.",
        );
      } finally {
        setIsSaving(false);
      }
    }

    if (automatic) setIsPaused(true);
  }, [attempt, attemptLoaded, exam?.durationSeconds, examId, mode, questions, storageKey, userId]);

  useEffect(() => {
    if (!attemptLoaded) return;
    localStorage.setItem(storageKey, JSON.stringify(attempt));
  }, [attempt, attemptLoaded, storageKey]);

  useEffect(() => {
    if (!attemptLoaded || questions.length === 0 || attempt.isSubmitted || isPaused || attempt.timeLeft <= 0) return;

    const timerId = window.setTimeout(() => {
      setAttempt((current) => ({
        ...current,
        timeLeft: Math.max(0, current.timeLeft - 1),
        elapsedSeconds: current.elapsedSeconds + 1,
        startedAt: Date.now(),
      }));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [attempt.isSubmitted, attempt.timeLeft, attemptLoaded, isPaused, questions.length]);

  useEffect(() => {
    if (attemptLoaded && !attempt.isSubmitted && attempt.timeLeft === 0) {
      void submitTest(true);
    }
  }, [attempt.isSubmitted, attempt.timeLeft, attemptLoaded, submitTest]);

  useEffect(() => {
    if (!attemptLoaded || attempt.isSubmitted) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [attempt.isSubmitted, attemptLoaded]);

  const selectAnswer = (answer: number) => {
    if (attempt.isSubmitted) return;
    const questionId = questions[attempt.currentQuestion]?.id;
    if (questionId === undefined) return;
    setAttempt((current) => ({
      ...current,
      answers: { ...current.answers, [String(questionId)]: answer },
    }));
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setAttempt((current) => ({ ...current, currentQuestion: index }));
  };

  const toggleReviewFlag = (questionId: number) => {
    if (attempt.isSubmitted) return;
    setAttempt((current) => ({
      ...current,
      markedQuestionIds: current.markedQuestionIds.includes(questionId)
        ? current.markedQuestionIds.filter((id) => id !== questionId)
        : [...current.markedQuestionIds, questionId],
    }));
  };

  const restartTest = () => {
    const freshAttempt = createAttempt(exam?.durationSeconds);
    submittedRef.current = false;
    setAttempt(freshAttempt);
    setIsPaused(false);
    setSaveError(null);
  };

  const answers = questions.map((question) => attempt.answers[String(question.id)] ?? null);
  const progress = questions.length === 0 ? 0 : (Object.keys(attempt.answers).length / questions.length) * 100;

  return {
    questions,
    exam,
    questionsLoading,
    questionsError,
    answers,
    markedQuestionIds: attempt.markedQuestionIds,
    currentQuestion: attempt.currentQuestion,
    timeLeft: attempt.timeLeft,
    isPaused,
    isSubmitted: attempt.isSubmitted,
    elapsedSeconds: attempt.elapsedSeconds + (
      attempt.isSubmitted || isPaused ? 0 : Math.floor((Date.now() - attempt.startedAt) / 1000)
    ),
    isSaving,
    saveError,
    progress,
    selectAnswer,
    goToQuestion,
    toggleReviewFlag,
    nextQuestion: () => goToQuestion(attempt.currentQuestion + 1),
    prevQuestion: () => goToQuestion(attempt.currentQuestion - 1),
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
    submitTest,
    restartTest,
  };
};
