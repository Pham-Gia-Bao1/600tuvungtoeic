import React from 'react';
import { Button } from '@/components/common/Button/Button';
import { VocabWord } from '../../types/vocab.types';

interface WordDetailProps {
  word: VocabWord;
  onToggleLearned: () => void;
}

export const WordDetail: React.FC<WordDetailProps> = ({ word, onToggleLearned }) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Detailed Meaning</h3>
        <Button variant="primary" onClick={onToggleLearned}>
          Mark as Learned
        </Button>
      </div>

      {/* Part of Speech */}
      {word.partOfSpeech && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Part of Speech:</h4>
          <p className="text-gray-600">{word.partOfSpeech}</p>
        </div>
      )}

      {/* English Meaning */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">English Meaning:</h4>
        <p className="text-gray-600 leading-relaxed">{word.meaning}</p>
      </div>

      {/* Vietnamese Translation */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">Dịch Nghĩa Tiếng Việt:</h4>
        <p className="text-green-500 leading-relaxed italic">{word.vietnameseMeaning}</p>
      </div>

      {/* Word Family */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Word Family:</h4>
        <ul className="list-disc pl-6 space-y-1">
          {word.familyWords.map((fam, i) => (
            <li key={i} className="text-gray-600 font-bold">{fam}</li>
          ))}
        </ul>
      </div>

      {/* Example Sentence */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Example Sentence:</h4>
        <p className="italic bg-blue-50 p-3 rounded-lg text-gray-700">
          "{word.example}"
        </p>
      </div>

      {/* TOEIC Tip */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">TOEIC Tip:</h4>
        <p className="text-sm text-yellow-700">
          This word often appears in business emails or meetings. Practice pronunciation for listening sections.
        </p>
      </div>
    </div>
  );
};