import React from 'react';
import { Button } from '@/components/common/Button/Button';
import { VocabWord } from '../../types/vocab.types';

interface WordDetailProps {
  word: VocabWord;
  onToggleLearned: () => void;
  onToggleFavorite: () => void;
  revealed: boolean;
  onToggleReveal: () => void;
}

export const WordDetail: React.FC<WordDetailProps> = ({
  word,
  onToggleLearned,
  onToggleFavorite,
  revealed,
  onToggleReveal,
}) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-bold text-gray-800">Detailed Meaning</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onToggleReveal}>
            {revealed ? "Hide meaning" : "Reveal meaning"}
          </Button>
          <Button
            aria-pressed={Boolean(word.favorite)}
            variant={word.favorite ? "warning" : "outline"}
            onClick={onToggleFavorite}
          >
            {word.favorite ? "Remove favorite" : "Add to favorites"}
          </Button>
          <Button variant={word.learned ? "success" : "primary"} onClick={onToggleLearned}>
            {word.learned ? "Mark as not learned" : "Mark as learned"}
          </Button>
        </div>
      </div>

      {revealed ? (
        <>
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

      {word.familyWords.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Word Family:</h4>
          <ul className="list-disc pl-6 space-y-1">
            {word.familyWords.map((fam) => (
              <li key={fam} className="text-gray-600 font-bold">{fam}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Example Sentence */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Example Sentence:</h4>
        <p className="italic bg-blue-50 p-3 rounded-lg text-gray-700">
          "{word.example}"
        </p>
      </div>

      {word.collocations && word.collocations.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Common Collocations:</h4>
          <ul className="list-disc pl-6 space-y-1">
            {word.collocations.map((collocation) => (
              <li key={collocation} className="text-gray-600">{collocation}</li>
            ))}
          </ul>
        </div>
      )}

      {word.tip && (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">TOEIC Tip:</h4>
          <p className="text-sm text-yellow-700">{word.tip}</p>
        </div>
      )}
        </>
      ) : (
        <p className="rounded-lg bg-sky-50 p-4 text-sky-900">
          Think of the meaning, then reveal it when you’re ready.
        </p>
      )}
    </div>
  );
};