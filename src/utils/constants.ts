import { CourseCardProps } from "@/components/ui/CourseCard/CourseCard.types";

export const APP_NAME = "MyApp";

// Menu config chung
export const menuItems: Array<{ path: string; label: string }> = [
    {path: "/", label: "Trang chủ" },
  { path: "/test", label: "Thi thử" },
  { path: "/courses", label: "Kho đề thi" },
  { path: "/community", label: "Cộng đồng" },
];

// src/utils/constants.ts
export const coursesData : CourseCardProps[] = [
  {
    id: 1,
    title: "TOEIC Practice Test 1",
    subtitle: "Full Listening + Reading test",
    duration: "120 phút",
    parts: "7 parts",
    questions: "200 questions",
    score: 850,
    isOfficial: false,

    // ✅ props cho modal
    listeningTime: 45,
    readingTime: 75,
    totalTime: 120,
    rules: [
      "This test has two sections: reading and listening",
      "You will start with a 7.5-minute reading section",
      "Pace yourself to avoid running out of time",
      "No penalty for wrong answers",
      "Once you click “Next” you cannot go back",
      "Full-screen mode recommended",
    ],
  },
  {
    id: 2,
    title: "TOEIC Practice Test 2",
    subtitle: "Simulated real exam",
    duration: "120 phút",
    parts: "7 parts",
    questions: "200 questions",
    score: 720,
    isOfficial: true,

    listeningTime: 45,
    readingTime: 75,
    totalTime: 120,
    rules: [
      "This test has two sections: reading and listening",
      "Stay focused during the listening part",
      "Time management is critical",
      "Answers cannot be changed once submitted",
    ],
  },
  {
    id: 3,
    title: "TOEIC Practice Test 3",
    subtitle: "Đề luyện tập nâng cao",
    duration: "120 phút",
    parts: "7 parts",
    questions: "200 questions",
    score: 89,
    isOfficial: false,

    listeningTime: 45,
    readingTime: 75,
    totalTime: 120,
    rules: [
      "Focus on weak sections",
      "Attempt all questions — no negative marking",
      "Try to finish each part within the recommended time",
    ],
  },
];
