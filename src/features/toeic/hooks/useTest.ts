import { useState, useEffect } from 'react';
import { mockQuestions } from '../data/mockQuestions';
import { Question } from '@/types/toeic';

export const useTest = () => {
  const [questions] = useState<Question[]>(mockQuestions);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mockQuestions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 min total
  const [section] = useState<'listening' | 'reading'>('listening');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      submitTest();
    }
  }, [timeLeft]);

  const selectAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = () => {
    setIsSubmitted(true);
    // Mock score calculation
    const score = answers.reduce((acc: number, ans, idx) => ans === questions[idx].correctAnswer ? acc + 1 : acc, 0);
    console.log('Score:', score);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return {
    questions,
    answers,
    currentQuestion,
    timeLeft,
    section,
    isSubmitted,
    progress,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
  };
};