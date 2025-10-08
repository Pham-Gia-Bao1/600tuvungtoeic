
export const formatPhonetic = (phonetic: string): string => {
  return phonetic ? `/${phonetic}/` : 'N/A';
};

export const generateAudioSrc = (word: string): string => {
  return `https://api.dictionaryapi.dev/audio/${word.toLowerCase()}.mp3`; // Mock TTS API
};