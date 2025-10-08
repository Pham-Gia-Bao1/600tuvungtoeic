import { Question } from "@/types/toeic";

export const mockQuestions: Question[] = [
  // Listening (10 questions, mock audio)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: 'listening' as const,
    text: `Question ${i + 1}: Listen to the audio and choose the best answer.`,
    options: ['Option A: Short answer 1', 'Option B: Short answer 2', 'Option C: Short answer 3', 'Option D: Short answer 4'],
    correctAnswer: Math.floor(Math.random() * 4), // Random for MVP
    audioSrc: '/mock-audio/q' + (i + 1) + '.mp3', // Placeholder
  })),
  // Reading (10 questions)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    type: 'reading' as const,
    text: `Question ${i + 11}: Read the passage and choose the best answer. Passage: This is a mock passage about business English.`,
    options: ['Option A: Reading choice 1', 'Option B: Reading choice 2', 'Option C: Reading choice 3', 'Option D: Reading choice 4'],
    correctAnswer: Math.floor(Math.random() * 4),
  })),
];