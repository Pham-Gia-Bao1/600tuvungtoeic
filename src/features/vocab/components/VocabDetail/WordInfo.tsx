import React from 'react';
import { WordAudioPlayer } from '../AudioPlayer/WordAudioPlayer';
import { VocabWord } from '../../types/vocab.types';

interface WordInfoProps {
  word: VocabWord;
}

export const WordInfo: React.FC<WordInfoProps> = ({ word }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{word.word}</h1>
      <div className="flex items-center gap-2">
        <span className="text-lg italic">{word.phonetic}</span>
        <WordAudioPlayer src={word.audioSrc} />
      </div>
      <div>
        <h3 className="font-semibold">Meaning:</h3>
        <p>{word.meaning}</p>
      </div>
      <div>
        <h3 className="font-semibold">Family Words:</h3>
        <ul className="list-disc pl-5">
          {word.familyWords.map((fam, i) => <li key={i}>{fam}</li>)}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">Example:</h3>
        <p className="italic">{word.example}</p>
      </div>
    </div>
  );
};