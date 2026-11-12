import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import { toeicService, type ToeicExam } from "../services/toeicService";

export const ExamCatalog: React.FC = () => {
  const [exams, setExams] = useState<ToeicExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    toeicService.fetchExams().then((items) => {
      if (active) setExams(items);
    }).catch((fetchError: unknown) => {
      if (active) {
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load exams.");
      }
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <p className="p-8 text-center" role="status">Loading exams...</p>;
  if (error) return <p className="p-8 text-center text-red-600" role="alert">{error}</p>;

  return (
  <div className="min-h-screen bg-[var(--color-bg-light)] px-4 py-10 sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">TOEIC Practice Exams</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          The current available set is an original 20-question Reading diagnostic, not a full TOEIC exam.
          Full 200-question exams require a complete, validated question bank and listening assets.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          TOEIC score estimates are not shown for this short diagnostic.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exams.length === 0 && (
          <p className="col-span-full text-center text-gray-600">No exams are available yet.</p>
        )}
        {exams.map((exam) => (
          <article key={exam.id} className="flex flex-col rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold">{exam.title}</h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                exam.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
              }`}>
                {exam.available ? "Sample available" : "Question bank pending"}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">{exam.difficulty}</p>
            <p className="text-sm text-gray-500">Practice range: {exam.scoreRange}</p>
            {exam.available ? (
              <>
                <p className="mt-3 text-sm">
                  {exam.questionCount} {exam.section === "reading" ? "Reading" : "Listening"} questions
                  {" · "}{Math.ceil(exam.durationSeconds / 60)} minutes
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <Link href={`/courses/${exam.id}?mode=practice`}>
                    <Button size="sm">Practice mode</Button>
                  </Link>
                  <Link href={`/courses/${exam.id}?mode=test`}>
                    <Button size="sm" variant="outline">Test mode</Button>
                  </Link>
                </div>
              </>
            ) : (
              <p className="mt-auto pt-5 text-sm text-gray-500">
                This exam is unavailable until its original questions are authored and validated.
              </p>
            )}
          </article>
        ))}
      </section>
    </div>
  </div>
  );
};
