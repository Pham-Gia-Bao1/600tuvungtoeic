export interface VocabWord {
    id: string;
    word: string;
    familyWords: string[];  // e.g., ['contractor', 'contractual']
    phonetic: string;  // IPA e.g., /kənˈtrækt/
    meaning: string;  // English
    vietnameseMeaning: string;  // New: Vietnamese translation
    example: string;  // Sentence
    audioSrc: string;  // Audio URL
    learned?: boolean;
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

export interface Lesson {
    id: string;
    title: string;  // Topic e.g., "Office Procedures"
    words: VocabWord[];  // 12+ words
    progress?: number;  // % learned in lesson
    image?: string; // Optional image URL for the lesson
    category: string; // e.g., "Business", "Travel"
    description?: string; // Optional brief description of the lesson
    tip?: string; // Optional TOEIC tip related to the lesson
    totalWords?: number; // Optional total number of words in the lesson
    learnedWords?: number; // Optional number of words learned in the lesson
}

export interface VocabState {
    lessons: Lesson[];
    searchQuery: string;
}

export interface UseVocabReturn {
    filteredWords: VocabWord[];
    search: (query: string) => void;
    toggleLearned: (id: string) => void;
    getWordById: (id: string) => VocabWord | undefined;
    progress: number;
}