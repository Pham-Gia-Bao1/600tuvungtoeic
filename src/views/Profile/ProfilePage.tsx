"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, CalendarDays, CheckCircle2, Clock3, Star, Target, UserRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useVocab } from "@/features/vocab/hooks/useVocab";
import { toeicService, type ToeicExamAttempt } from "@/features/toeic/services/toeicService";

const formatDate = (date: string): string =>
  new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(date));

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes > 0 ? `${minutes} phút ${remainingSeconds} giây` : `${remainingSeconds} giây`;
};

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Không thể tải lịch sử thi TOEIC.";

export const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { lessons, progressLoading, progressError } = useVocab();
  const [attempts, setAttempts] = useState<ToeicExamAttempt[]>([]);
  const [attemptsLoading, setAttemptsLoading] = useState(true);
  const [attemptsError, setAttemptsError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (authLoading) return () => { active = false; };
    if (!user) {
      setAttempts([]);
      setAttemptsLoading(false);
      return () => { active = false; };
    }

    setAttemptsLoading(true);
    setAttemptsError(null);
    void toeicService.fetchAttempts(user.id)
      .then((result) => {
        if (active) setAttempts(result);
      })
      .catch((error: unknown) => {
        if (active) setAttemptsError(getErrorMessage(error));
      })
      .finally(() => {
        if (active) setAttemptsLoading(false);
      });

    return () => { active = false; };
  }, [authLoading, user]);

  const vocabularyStats = useMemo(() => {
    const words = lessons.flatMap((lesson) => lesson.words);
    const learned = words.filter((word) => word.learned).length;
    const favorites = words.filter((word) => word.favorite).length;
    const correct = words.reduce((total, word) => total + (word.correctAnswers ?? 0), 0);
    const incorrect = words.reduce((total, word) => total + (word.incorrectAnswers ?? 0), 0);

    return {
      learned,
      total: words.length,
      favorites,
      completedLessons: lessons.filter((lesson) => lesson.words.length > 0 && lesson.progress === 100).length,
      accuracy: correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0,
      progress: words.length > 0 ? Math.round((learned / words.length) * 100) : 0,
    };
  }, [lessons]);

  const examStats = useMemo(() => ({
    count: attempts.length,
    averageAccuracy: attempts.length
      ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.correct_count / attempt.total_questions, 0) * 100 / attempts.length)
      : 0,
    bestAccuracy: attempts.length
      ? Math.round(Math.max(...attempts.map((attempt) => attempt.correct_count / attempt.total_questions)) * 100)
      : 0,
  }), [attempts]);

  if (authLoading) {
    return <p className="p-8 text-center text-gray-600" role="status">Đang tải thông tin tài khoản...</p>;
  }

  if (!user) {
    return (
      <section className="mx-auto my-12 max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <UserRound className="mx-auto h-12 w-12 text-sky-600" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="mt-2 text-gray-600">Đăng nhập để xem thông tin và theo dõi tiến độ học tập của bạn.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-lg bg-sky-600 px-5 py-2.5 font-medium text-white hover:bg-sky-700">
          Đăng nhập
        </Link>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Tài khoản của bạn</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-gray-600">Thông tin cá nhân và tổng quan hành trình học TOEIC.</p>
      </header>

      <section className="flex flex-col gap-5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-6 text-white shadow-sm sm:flex-row sm:items-center">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-20 w-20 rounded-full border-4 border-white/40 object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold" aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-2xl font-bold">{user.name}</h2>
          <p className="mt-1 break-all text-white/90">{user.email}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
            <CalendarDays size={16} aria-hidden="true" />
            Thành viên từ {formatDate(user.createdAt)}
          </p>
        </div>
        <Link href="/vocab" className="self-start rounded-lg bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 sm:self-center">
          Tiếp tục học
        </Link>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Tiến độ từ vựng</h2>
        {progressError && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{progressError}</p>}
        {progressLoading ? (
          <p className="rounded-xl bg-white p-5 text-gray-600" role="status">Đang tải tiến độ từ vựng...</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<BookOpen />} label="Từ đã học" value={`${vocabularyStats.learned} / ${vocabularyStats.total}`} />
              <StatCard icon={<CheckCircle2 />} label="Bài học hoàn thành" value={vocabularyStats.completedLessons} />
              <StatCard icon={<Target />} label="Độ chính xác ôn tập" value={`${vocabularyStats.accuracy}%`} />
              <StatCard icon={<Star />} label="Từ yêu thích" value={vocabularyStats.favorites} />
            </div>
            <div className="mt-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-gray-700">Tổng tiến độ học từ</span>
                <span className="font-semibold text-sky-700">{vocabularyStats.progress}%</span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100" role="progressbar" aria-valuenow={vocabularyStats.progress} aria-valuemin={0} aria-valuemax={100} aria-label="Tiến độ học từ vựng">
                <div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${vocabularyStats.progress}%` }} />
              </div>
            </div>
          </>
        )}
      </section>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Lịch sử thi TOEIC</h2>
            <p className="mt-1 text-sm text-gray-600">Các lần thi đã hoàn thành khi bạn đăng nhập.</p>
          </div>
          <Link href="/courses" className="text-sm font-semibold text-sky-700 hover:underline">Chọn đề thi</Link>
        </div>
        <div className="mb-4 grid gap-4 sm:grid-cols-3">
          <StatCard icon={<BookOpen />} label="Lượt thi đã lưu" value={examStats.count} />
          <StatCard icon={<Target />} label="Điểm đúng trung bình" value={`${examStats.averageAccuracy}%`} />
          <StatCard icon={<Star />} label="Kết quả tốt nhất" value={`${examStats.bestAccuracy}%`} />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {attemptsLoading ? (
            <p className="p-5 text-gray-600" role="status">Đang tải lịch sử thi...</p>
          ) : attemptsError ? (
            <p className="p-5 text-sm text-red-700" role="alert">{attemptsError}</p>
          ) : attempts.length === 0 ? (
            <div className="p-6 text-center">
              <p className="font-medium text-gray-800">Bạn chưa có lượt thi nào được lưu.</p>
              <p className="mt-1 text-sm text-gray-600">Đăng nhập trước khi hoàn thành bài thi để lưu kết quả tại đây.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {attempts.slice(0, 10).map((attempt) => {
                const accuracy = Math.round((attempt.correct_count / attempt.total_questions) * 100);
                return (
                  <li key={attempt.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Đề thi {attempt.exam_id}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {attempt.mode === "test" ? "Thi thử" : "Luyện tập"} · {formatDate(attempt.submitted_at)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                      <span className="font-semibold text-sky-700">{attempt.correct_count}/{attempt.total_questions} đúng ({accuracy}%)</span>
                      <span className="inline-flex items-center gap-1 text-gray-600">
                        <Clock3 size={15} aria-hidden="true" /> {formatDuration(attempt.duration_seconds)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-2 text-sky-700">
      {icon}
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
    <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
  </div>
);
