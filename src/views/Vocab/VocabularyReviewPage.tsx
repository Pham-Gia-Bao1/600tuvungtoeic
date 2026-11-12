import React from "react";
import { LearningModePanel } from "@/features/vocab/components/LearningModePanel";
import { useVocab } from "@/features/vocab/hooks/useVocab";

export const VocabularyReviewPage: React.FC = () => {
  const { dailyReviewWords, progressLoading, progressError, recordReview } = useVocab();

  if (progressLoading) {
    return <p className="p-8 text-center" role="status">Loading your review list...</p>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] p-4 sm:p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Daily vocabulary review</h1>
      {progressError && <p className="mx-auto mb-4 max-w-2xl text-red-600" role="alert">{progressError}</p>}
      <LearningModePanel
        mode="review"
        words={dailyReviewWords}
        onAnswer={recordReview}
      />
    </div>
  );
};
