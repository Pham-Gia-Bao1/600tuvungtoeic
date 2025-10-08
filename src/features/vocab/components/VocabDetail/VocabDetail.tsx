// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { WordInfo } from './WordInfo';
// import { Button } from '@/components/common/Button/Button';
// import { useVocab } from '../../hooks/useVocab';

// export const VocabDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { getWordById, toggleLearned } = useVocab();
//   const word = getWordById(id || '');

//   if (!word) return <div>Word not found</div>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <WordInfo word={word} />
//       <div className="flex gap-4 mt-6">
//         <Button variant="primary" onClick={() => toggleLearned(word.id)}>
//           {word.learned ? 'Unlearn' : 'Mark as Learned'}
//         </Button>
//         <Button variant="outline">Add to Flashcard</Button>
//       </div>
//     </div>
//   );
// };