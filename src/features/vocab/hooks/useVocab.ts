import { useContext } from "react";
import { VocabContext } from "./vocabContext";

export const useVocab = () => {
  const context = useContext(VocabContext);
  if (!context) throw new Error("useVocab must be used inside VocabProvider");
  return context;
};
