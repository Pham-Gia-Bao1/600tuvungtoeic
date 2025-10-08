export interface Question {
  id: number;
  type: 'listening' | 'reading';
  text: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  audioSrc?: string; // For listening
  explanation?: string; // For review
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