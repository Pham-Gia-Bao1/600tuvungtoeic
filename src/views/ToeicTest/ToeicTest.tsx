import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/common/Button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/features/toeic/components/Navigation/Navigation";
import { Question } from "@/features/toeic/components/Question/Question";
import { TestHeader } from "@/features/toeic/components/TestHeader/TestHeader";
import { ExamResults } from "@/features/toeic/components/ExamResults";
import { useTest } from "@/features/toeic/hooks/useTest";

const formatTime = (seconds: number): string =>
  `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

export const ToeicTest: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [showPracticeFeedback, setShowPracticeFeedback] = useState(false);

  if (!examId) return null;
  if (authLoading) return <p className="p-8 text-center" role="status">Loading session...</p>;

  const mode = searchParams.get("mode") === "practice" ? "practice" : "test";

  return (
    <ExamRunner
      key={examId}
      examId={examId}
      mode={mode}
      userId={user?.id}
      showPracticeFeedback={showPracticeFeedback}
      onTogglePracticeFeedback={() => setShowPracticeFeedback((show) => !show)}
      onBack={() => {
        if (window.confirm("Leave this exam? Your answers are saved locally and can be resumed later.")) {
          router.push("/courses");
        }
      }}
    />
  );
};

type ExamRunnerProps = {
  examId: string;
  mode: "practice" | "test";
  userId?: string;
  showPracticeFeedback: boolean;
  onTogglePracticeFeedback: () => void;
  onBack: () => void;
};

const ExamRunner: React.FC<ExamRunnerProps> = ({
  examId,
  mode,
  userId,
  showPracticeFeedback,
  onTogglePracticeFeedback,
  onBack,
}) => {
  const test = useTest(examId, mode, userId);

  if (test.questionsLoading) {
    return <p className="p-8 text-center" role="status">Loading exam...</p>;
  }

  if (test.questionsError || !test.exam || test.questions.length === 0) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-semibold">
          {test.questionsError ?? "This exam is not available yet."}
        </h1>
        <Link className="mt-4 inline-block text-sky-700 underline" href="/courses">
          Return to exams
        </Link>
      </main>
    );
  }

  if (test.isSubmitted) {
    return (
      <ExamResults
        questions={test.questions}
        answers={test.answers}
        elapsedSeconds={test.elapsedSeconds}
        mode={mode}
        isSaving={test.isSaving}
        saveError={test.saveError}
        onRestart={test.restartTest}
      />
    );
  }

  const question = test.questions[test.currentQuestion];
  const selectedAnswer = test.answers[test.currentQuestion] ?? null;
  const flagged = test.markedQuestionIds.includes(question.id);
  const answered = test.answers.filter((answer) => answer !== null).length;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-light)]">
      <TestHeader
        title={`${test.exam.title} · ${test.questions.length} Questions`}
        progress={test.progress}
        section="reading"
        timeLeft={test.timeLeft}
        mode={mode}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-3">
        <Button size="sm" variant="outline" onClick={onBack}>Exit exam</Button>
        <p className="text-sm text-gray-600">
          {answered} / {test.questions.length} answered · {test.markedQuestionIds.length} marked for review
        </p>
        {mode === "practice" ? (
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" onClick={test.isPaused ? test.resume : test.pause}>
              {test.isPaused ? "Resume timer" : "Pause timer"}
            </Button>
            <label className="flex items-center gap-2 text-sm">
              <input
                checked={showPracticeFeedback}
                onChange={onTogglePracticeFeedback}
                type="checkbox"
              />
              Show answer feedback
            </label>
          </div>
        ) : (
          <span className="text-sm font-medium text-sky-800">Test mode · answers shown after submission</span>
        )}
      </div>

      {test.isPaused && mode === "practice" && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900" role="status">
          Timer paused. Your answers are saved on this device.
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6">
        <Question
          question={question}
          questionNumber={test.currentQuestion + 1}
          selectedAnswer={selectedAnswer}
          onSelect={test.selectAnswer}
          flagged={flagged}
          onToggleFlag={() => test.toggleReviewFlag(question.id)}
          showFeedback={mode === "practice" && showPracticeFeedback}
        />
      </main>

      <Navigation
        current={test.currentQuestion}
        total={test.questions.length}
        onPrev={test.prevQuestion}
        onNext={test.nextQuestion}
        onSubmit={() => {
          if (window.confirm("Submit this exam now? You will see your results and answer explanations.")) {
            void test.submitTest();
          }
        }}
        onJump={test.goToQuestion}
        answers={test.answers}
        markedQuestionIds={test.markedQuestionIds}
      />
      {test.saveError && <p className="bg-white p-3 text-center text-red-600" role="alert">{test.saveError}</p>}
      <p className="sr-only" aria-live="polite">Time remaining: {formatTime(test.timeLeft)}</p>
    </div>
  );
};
