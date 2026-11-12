export interface VocabWord {
    id: string;
    word: string;
    familyWords: string[];  // e.g., ['contractor', 'contractual']
    phonetic: string;  // IPA e.g., /kənˈtrækt/
    meaning: string;  // English
    vietnameseMeaning: string;  // New: Vietnamese translation
    example: string;  // Sentence
    audioSrc?: string;
    learned?: boolean;
    favorite?: boolean;
    correctAnswers?: number;
    incorrectAnswers?: number;
    nextReviewAt?: string | null;
    imageSrc?: string; // Optional image URL for the word
    partOfSpeech?: string; // e.g., noun, verb
    videoAudio?: string; // Optional video/audio URL for advanced learning
    tip?: string; // Optional TOEIC tip related to the word
    note?: string; // Optional additional notes
    synonyms?: string[]; // Optional list of synonyms
    antonyms?: string[]; // Optional list of antonyms
    collocations?: string[]; // Optional list of common collocations
    frequencyRank?: number; // Optional frequency rank for the word
    difficultyLevel?: 'easy' | 'medium' | 'hard'; // Optional difficulty level
}

export interface LessonExercise {
    id: string;
    wordId: string;
    prompt: string;
    options: string[];
    answer: string;
    explanation: string;
}

export interface Lesson {
    id: string;
    title: string;  // Topic e.g., "Office Procedures"
    words: VocabWord[];  // 12+ words
    exercises?: LessonExercise[];
    progress?: number;  // % learned in lesson
    image?: string; // Optional image URL for the lesson
    category: string; // e.g., "Business", "Travel"
    description?: string; // Optional brief description of the lesson
    tip?: string; // Optional TOEIC tip related to the lesson
    totalWords?: number; // Optional total number of words in the lesson
    learnedWords?: number; // Optional number of words learned in the lesson
}
