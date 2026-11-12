import React from "react";
import { Button } from "@/components/common/Button/Button";
import { useVocab } from "@/features/vocab/hooks/useVocab";

export const VocabularyFavoritesPage: React.FC = () => {
  const { lessons, progressLoading, progressError, toggleFavorite } = useVocab();
  const favorites = lessons.flatMap((lesson) => lesson.words).filter((word) => word.favorite);

  if (progressLoading) {
    return <p className="p-8 text-center" role="status">Loading your favorites...</p>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] p-4 sm:p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Favorite vocabulary</h1>
      {progressError && <p className="mx-auto mb-4 max-w-3xl text-red-600" role="alert">{progressError}</p>}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t favorited any words yet.</p>
      ) : (
        <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {favorites.map((word) => (
            <li className="rounded-xl bg-white p-5 shadow-sm" key={word.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{word.word}</h2>
                  <p className="text-sm italic text-gray-500">{word.phonetic}</p>
                  <p className="mt-3">{word.vietnameseMeaning}</p>
                  <p className="mt-1 text-sm text-gray-600">{word.meaning}</p>
                  <p className="mt-3 text-sm italic text-gray-600">{word.example}</p>
                </div>
                <Button
                  aria-label={`Remove ${word.word} from favorites`}
                  size="sm"
                  variant="outline"
                  onClick={() => void toggleFavorite(word.id)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
