export type ExamMode = 'practice' | 'test';

export interface Question {
  id: number;
  type: 'listening' | 'reading';
  text: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  audioSrc?: string; // For listening
  explanation?: string; // For review
  partNumber: 5 | 6 | 7;
  passage?: string;
}

export interface TestState {
  answers: (number | null)[];
  currentQuestion: number;
  timeLeft: number; // Seconds
  section: 'listening' | 'reading';
}

export interface ToeicTestProps {
  // Props for page if needed
}