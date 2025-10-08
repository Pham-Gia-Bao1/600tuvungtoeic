// import axios from 'axios'; // npm i axios if not
// import { Lesson, VocabWord } from '../features/vocab/types/vocab.types';

// const API_BASE = 'http://localhost:8000/api'; // Change to heroku if live

// const api = axios.create({ baseURL: API_BASE });

// export const vocabService = {
//   // Lessons
//   fetchLessons: async (): Promise<Lesson[]> => {
//     try {
//       const { data } = await api.get('/themes/');
//       return data; // Assume response: [{id, title, words: [...]}]
//     } catch (error) {
//       console.error('API Error:', error);
//       return []; // Fallback
//     }
//   },

//   fetchLessonById: async (id: string): Promise<Lesson> => {
//     try {
//       const { data } = await api.get(`/themes/${id}/`);
//       return data;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error; // Rethrow for handling
//     }
//   },

//   // Words CRUD
//   updateWordLearned: async (wordId: string, learned: boolean): Promise<VocabWord> => {
//     try {
//       const { data } = await api.put(`/words/${wordId}/`, { learned });
//       return data;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   },

//   // Example POST new word (if admin)
//   createWord: async (wordData: Omit<VocabWord, 'id'>): Promise<VocabWord> => {
//     const { data } = await api.post('/words/', wordData);
//     return data;
//   },
// };