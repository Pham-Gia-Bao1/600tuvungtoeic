import { Question } from "@/types/toeic";

export const calculateScore = (answers: (number | null)[], questions: Question[]): number => {
  return answers.reduce((acc: number, ans, idx) => (ans === questions[idx].correctAnswer ? acc + 1 : acc), 0);
};