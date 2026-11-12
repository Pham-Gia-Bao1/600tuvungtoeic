import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setState(JSON.parse(raw) as T);
    } catch (error) {
      console.error(`Unable to load local storage key "${key}":`, error);
    }
  }, [key]);

  const set = (v: T) => {
    setState(v);
    try {
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (error) {
      console.error(`Unable to save local storage key "${key}":`, error);
    }
  };

  return [state, set] as const;
}
